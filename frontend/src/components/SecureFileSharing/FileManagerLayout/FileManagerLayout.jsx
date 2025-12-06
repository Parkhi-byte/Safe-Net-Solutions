import React, { useEffect, useMemo, useState } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import FileExplorer from '../FileExplorer/FileExplorer';
import FileUpload from '../FileUpload/FileUpload';
import EncryptionStatus from '../EncryptionStatus/EncryptionStatus';
import AccessControls from '../AccessControls/AccessControls';
import AuditLog from '../AuditLog/AuditLog';
import styles from './FileManagerLayout.module.css';

const FileManagerLayout = ({
  onPreviewFile,
  onShareFile,
  onOpenAccess,
  focusAccessFile,
  onClearAccessFocus,
}) => {
  const {
    breadcrumbs,
    folders,
    currentFolder,
    setCurrentFolder,
    createFolder,
    storageUsage,
    storagePercent,
    selectedFiles,
    deleteFiles,
    moveSelectedFiles,
    filteredFiles,
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    selectAllVisible,
    uploadQueue,
    formatBytes,
    isBusy,
    renameItem,
  } = useFileContext();
  const [folderName, setFolderName] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [moveTarget, setMoveTarget] = useState(currentFolder);

  useEffect(() => {
    setMoveTarget(currentFolder);
  }, [currentFolder]);

  const visibleFolderChildren = useMemo(
    () => folders.filter((folder) => folder.parentId === currentFolder && folder._id !== 'root'),
    [folders, currentFolder]
  );

  const visibleFileIds = useMemo(
    () =>
      filteredFiles
        .filter((file) => (typeFilter === 'all' ? true : file.type === typeFilter))
        .map((file) => file.id),
    [filteredFiles, typeFilter]
  );

  const handleCreateFolder = (event) => {
    event.preventDefault();
    if (!folderName.trim()) return;
    createFolder(folderName.trim());
    setFolderName('');
  };

  const bulkDelete = () => {
    if (!selectedFiles.length) return;
    if (window.confirm(`Delete ${selectedFiles.length} file(s)?`)) {
      deleteFiles(selectedFiles);
    }
  };
  const bulkMove = () => selectedFiles.length && moveTarget && moveSelectedFiles(moveTarget);

  const renameFolder = (folder) => {
    const nextName = window.prompt('Rename folder', folder.name);
    if (nextName && nextName !== folder.name) {
      renameItem(folder.id, 'folder', nextName.trim());
    }
  };

  const storageLabel = `${formatBytes(storageUsage.used)} of ${formatBytes(storageUsage.quota)} used`;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Secure Drive</h2>
          <p>Zero-knowledge encryption with live key rotation.</p>
        </div>

        <div className={styles.storageCard}>
          <div className={styles.storageTop}>
            <div>
              <p>Storage quota</p>
              <strong>{storageLabel}</strong>
            </div>
            <span className={styles.storagePercent}>{storagePercent}%</span>
          </div>
          <div className={styles.progressBar}>
            <span style={{ width: `${storagePercent}%` }} />
          </div>
          <small>Encrypted at rest · AES-256</small>
        </div>

        <form className={styles.folderForm} onSubmit={handleCreateFolder}>
          <label htmlFor="folderName">Create folder</label>
          <div className={styles.folderInputGroup}>
            <input
              id="folderName"
              type="text"
              value={folderName}
              placeholder="e.g., Board Reports"
              onChange={(event) => setFolderName(event.target.value)}
            />
            <button type="submit">Create</button>
          </div>
        </form>

        <div className={styles.foldersList}>
          <div className={styles.foldersHeader}>
            <span>Folders</span>
            <button type="button" onClick={() => setCurrentFolder('root')}>
              Reset
            </button>
          </div>
          <ul>
            {folders.map((folder) => (
              <li key={folder._id}>
                <button
                  type="button"
                  className={folder._id === currentFolder ? styles.activeFolder : ''}
                  onClick={() => setCurrentFolder(folder._id)}
                  onDoubleClick={() => renameFolder(folder)}
                >
                  <span>{folder.name}</span>
                  <small>{folder.fileCount ?? 0} items</small>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <EncryptionStatus />
      </aside>

      <main className={styles.main}>
        {isBusy && (
          <div className={styles.busyBanner}>
            <span className={styles.spinner} />
            Preparing secure download...
          </div>
        )}
        <header className={styles.toolbar}>
          <div className={styles.breadcrumbs}>
            {breadcrumbs.map((folder, index) => (
              <button
                key={folder.id || folder._id}
                type="button"
                onClick={() => setCurrentFolder(folder.id || folder._id)}
              >
                {folder.name}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </button>
            ))}
          </div>

          <div className={styles.filters}>
            <input
              type="search"
              placeholder="Search files, users..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">All types</option>
              <option value="pdf">PDF</option>
              <option value="doc">Documents</option>
              <option value="sheet">Spreadsheets</option>
              <option value="image">Images</option>
              <option value="slides">Slides</option>
              <option value="archive">Archives</option>
            </select>
            <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
              <option value="name">Sort: Name</option>
              <option value="date">Sort: Date</option>
              <option value="size">Sort: Size</option>
            </select>
            <button type="button" onClick={() => selectAllVisible(visibleFileIds)}>
              {selectedFiles.length === visibleFileIds.length ? 'Clear selection' : 'Select all'}
            </button>
          </div>
        </header>

        {selectedFiles.length > 0 && (
          <div className={styles.bulkBar}>
            <p>{selectedFiles.length} selected</p>
            <button type="button" onClick={bulkMove}>
              Move
            </button>
            <select value={moveTarget} onChange={(event) => setMoveTarget(event.target.value)}>
              {folders.map((folder) => (
                <option value={folder._id} key={folder._id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => onShareFile(selectedFiles[0])}>Share</button>
            <button type="button" onClick={bulkDelete} className={styles.danger}>
              Delete
            </button>
          </div>
        )}

        <FileExplorer
          folders={visibleFolderChildren}
          files={filteredFiles.filter((file) => (typeFilter === 'all' ? true : file.type === typeFilter))}
          onPreview={onPreviewFile}
          onShare={onShareFile}
          onAccess={onOpenAccess}
        />

        <section className={styles.bottomSection}>
          <FileUpload uploadQueue={uploadQueue} />
          <div className={styles.rightColumn}>
            <AccessControls focusFile={focusAccessFile} onClearFocus={onClearAccessFocus} />
            <AuditLog />
          </div>
        </section>
      </main>
    </div>
  );
};

export default FileManagerLayout;

