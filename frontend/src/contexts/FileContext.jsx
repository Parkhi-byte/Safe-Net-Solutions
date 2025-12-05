import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { formatBytes, generateId, getBreadcrumbs, getFileType } from '../utils/fileUtils';
import { useAuth } from './AuthContext';

const defaultQuota = 25 * 1024 * 1024 * 1024; // 25 GB
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/gif',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/zip',
];

const FileContext = createContext(null);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]); // Folders not implemented in backend yet, keeping local state or mock
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [shareLinks, setShareLinks] = useState({});
  const [storageUsage, setStorageUsage] = useState({
    used: 0,
    quota: defaultQuota,
  });
  const [auditLog, setAuditLog] = useState([]);
  const [activeSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isBusy, setIsBusy] = useState(false);
  const timersRef = useRef([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [isAuthenticated]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get('/files');
      setFiles(res.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const addAuditEntry = useCallback((entry) => {
    setAuditLog((prev) => [
      {
        id: generateId('log'),
        timestamp: new Date().toISOString(),
        ...entry,
      },
      ...prev,
    ]);
  }, []);

  useEffect(() => {
    setStorageUsage((prev) => ({
      ...prev,
      used: files.reduce((sum, file) => sum + file.size, 0),
    }));
  }, [files]);

  useEffect(
    () => () => {
      timersRef.current.forEach((timerId) => clearTimeout(timerId));
      timersRef.current = [];
    },
    []
  );

  const toggleSelectFile = useCallback((fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  }, []);

  const clearSelection = useCallback(() => setSelectedFiles([]), []);

  const selectAllVisible = useCallback(
    (visibleIds) => {
      setSelectedFiles((prev) =>
        prev.length === visibleIds.length ? [] : Array.from(new Set(visibleIds))
      );
    },
    []
  );

  const handleUploadError = useCallback(
    (file, reason) => {
      const entryId = generateId('upload-error');
      setUploadQueue((prev) => [
        ...prev,
        {
          id: entryId,
          name: file.name,
          size: file.size || 0,
          progress: 0,
          status: 'error',
          error: reason,
        },
      ]);
      const removalTimer = setTimeout(() => {
        setUploadQueue((prev) => prev.filter((item) => item.id !== entryId));
      }, 4000);
      timersRef.current.push(removalTimer);
      addAuditEntry({
        action: 'upload-error',
        target: file.name,
        user: 'you',
        status: reason,
      });
    },
    [addAuditEntry]
  );

  const uploadFile = useCallback(async (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return handleUploadError(file, 'File exceeds size limit');
    }

    const queueId = generateId('upload');
    setUploadQueue((prev) => [...prev, {
      id: queueId,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
    }]);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', currentFolder);

    try {
      const res = await axios.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadQueue((prev) => prev.map(item =>
            item.id === queueId ? { ...item, progress } : item
          ));
        }
      });

      setFiles((prev) => [...prev, res.data]);
      setUploadQueue((prev) => prev.filter((item) => item.id !== queueId));
      addAuditEntry({
        action: 'upload',
        target: file.name,
        user: 'you',
        status: 'encrypted',
      });
    } catch (error) {
      handleUploadError(file, 'Upload failed');
      setUploadQueue((prev) => prev.filter((item) => item.id !== queueId));
    }
  }, [currentFolder, handleUploadError, addAuditEntry]);

  const uploadFiles = useCallback(
    (fileList) => {
      const filesArray = Array.from(fileList);
      if (!filesArray.length) return;
      filesArray.forEach((file) => uploadFile(file));
    },
    [uploadFile]
  );

  const createFolder = useCallback(
    (name) => {
      // Mock folder creation for now as backend doesn't support folders yet
      if (!name) return;
      const newFolder = {
        id: generateId('folder'),
        name,
        parentId: currentFolder,
        createdBy: 'you',
        createdAt: new Date().toISOString(),
        fileCount: 0,
        totalSize: 0,
      };
      setFolders((prev) => [...prev, newFolder]);
      addAuditEntry({
        action: 'folder-created',
        target: name,
        user: 'you',
        status: 'secured',
      });
    },
    [addAuditEntry, currentFolder]
  );

  const renameItem = useCallback((itemId, type, newName) => {
    // Implement API call if needed
    if (!newName) return;
    if (type === 'file') {
      setFiles((prev) => prev.map((file) => (file._id === itemId ? { ...file, name: newName } : file)));
    } else {
      setFolders((prev) =>
        prev.map((folder) => (folder.id === itemId ? { ...folder, name: newName } : folder))
      );
    }
    addAuditEntry({
      action: 'rename',
      target: newName,
      user: 'you',
      status: 'updated',
    });
  }, [addAuditEntry]);

  const deleteFiles = useCallback(
    async (ids) => {
      if (!ids.length) return;

      try {
        await Promise.all(ids.map(id => axios.delete(`/files/${id}`)));
        setFiles((prev) => prev.filter((file) => !ids.includes(file._id)));
        addAuditEntry({
          action: 'delete',
          target: `${ids.length} file(s)`,
          user: 'you',
          status: 'revoked',
        });
        clearSelection();
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    },
    [addAuditEntry, clearSelection]
  );

  const moveSelectedFiles = useCallback(
    (targetFolderId) => {
      if (!selectedFiles.length || !targetFolderId) return;
      // Mock move
      setFiles((prev) =>
        prev.map((file) =>
          selectedFiles.includes(file._id) ? { ...file, folderId: targetFolderId } : file
        )
      );
      addAuditEntry({
        action: 'move',
        target: `${selectedFiles.length} file(s)`,
        user: 'you',
        status: `to ${targetFolderId}`,
      });
      clearSelection();
    },
    [addAuditEntry, clearSelection, selectedFiles]
  );

  const downloadFile = useCallback(
    (fileId) => {
      const file = files.find((item) => item._id === fileId);
      if (!file) return;
      // In real app, this would be a secure download link
      window.open(`http://localhost:5000/${file.path}`, '_blank');

      addAuditEntry({
        action: 'download',
        target: file.name,
        user: 'you',
        status: 'decrypted-securely',
      });
    },
    [addAuditEntry, files]
  );

  const shareFile = useCallback(
    (fileId, payload) => {
      // Mock share
      setFiles((prev) =>
        prev.map((file) =>
          file._id === fileId
            ? {
              ...file,
              shareLinks: [
                ...(file.shareLinks || []),
                {
                  id: generateId('link'),
                  url: `https://safenet.com/share/${generateId('token').slice(-6)}`,
                  expires: payload.expires,
                  passwordProtected: payload.passwordProtected,
                  downloadLimit: payload.downloadLimit,
                  remainingDownloads: payload.downloadLimit,
                  permissions: payload.permissions,
                },
              ],
            }
            : file
        )
      );
      addAuditEntry({
        action: 'share',
        target: fileId,
        user: 'you',
        status: 'link-issued',
      });
    },
    [addAuditEntry]
  );

  const updatePermissions = useCallback((fileId, permissions) => {
    // Mock update
    setFiles((prev) =>
      prev.map((file) =>
        file._id === fileId ? { ...file, permissions: { ...file.permissions, ...permissions } } : file
      )
    );
    addAuditEntry({
      action: 'permissions-updated',
      target: fileId,
      user: 'you',
      status: 'policy-sync',
    });
  }, [addAuditEntry]);

  const revokeShareLink = useCallback((fileId, linkId) => {
    setFiles((prev) =>
      prev.map((file) =>
        file._id === fileId
          ? { ...file, shareLinks: file.shareLinks.filter((link) => link.id !== linkId) }
          : file
      )
    );
    addAuditEntry({
      action: 'share-revoked',
      target: `${fileId}:${linkId}`,
      user: 'you',
      status: 'revoked',
    });
  }, [addAuditEntry]);

  const filteredFiles = useMemo(() => {
    let scoped = files.filter((file) => file.folderId === currentFolder);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      scoped = scoped.filter(
        (file) =>
          file.name.toLowerCase().includes(term) || (file.uploadedBy && file.uploadedBy.toLowerCase().includes(term))
      );
    }
    switch (sortOption) {
      case 'date':
        scoped = scoped.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'size':
        scoped = scoped.sort((a, b) => b.size - a.size);
        break;
      default:
        scoped = scoped.sort((a, b) => a.name.localeCompare(b.name));
    }
    return scoped;
  }, [currentFolder, files, searchTerm, sortOption]);

  const breadcrumbs = useMemo(
    () => getBreadcrumbs(folders, currentFolder),
    [folders, currentFolder]
  );

  const storagePercent = useMemo(
    () => Math.min(100, Math.round((storageUsage.used / storageUsage.quota) * 100)),
    [storageUsage]
  );

  const value = {
    files,
    folders,
    currentFolder,
    setCurrentFolder,
    selectedFiles,
    toggleSelectFile,
    clearSelection,
    selectAllVisible,
    uploadQueue,
    storageUsage,
    storagePercent,
    shareLinks,
    auditLog,
    activeSessions,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    uploadFiles,
    createFolder,
    renameItem,
    deleteFiles,
    moveSelectedFiles,
    downloadFile,
    shareFile,
    updatePermissions,
    revokeShareLink,
    filteredFiles,
    breadcrumbs,
    isBusy,
    setIsBusy,
    formatBytes,
    MAX_FILE_SIZE,
    ACCEPTED_TYPES,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFileContext = () => {
  const ctx = useContext(FileContext);
  if (!ctx) {
    throw new Error('useFileContext must be used within FileProvider');
  }
  return ctx;
};
