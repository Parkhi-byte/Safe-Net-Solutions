import React, { useCallback, useMemo, useState } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import { formatBytes } from '../../../utils/fileUtils';
import FileCard from './FileCard';
import styles from './FileExplorer.module.css';

const FileExplorer = ({ folders = [], files = [], onPreview, onShare, onAccess }) => {
  const { toggleSelectFile, selectedFiles, setCurrentFolder, downloadFile, renameItem, deleteFiles } =
    useFileContext();
  const [viewMode, setViewMode] = useState('grid');

  const sortedFolders = useMemo(() => [...folders].sort((a, b) => a.name.localeCompare(b.name)), [folders]);

  const handleShare = useCallback((file) => onShare && onShare(file._id), [onShare]);
  const handlePreview = useCallback((file) => onPreview && onPreview(file), [onPreview]);
  const handleAccess = useCallback((file) => onAccess && onAccess(file), [onAccess]);

  const handleRename = useCallback((file) => {
    const nextName = window.prompt('Rename file', file.name);
    if (nextName && nextName !== file.name) {
      renameItem(file._id, 'file', nextName.trim());
    }
  }, [renameItem]);

  const handleDelete = useCallback((file) => {
    if (window.confirm(`Delete ${file.name}?`)) {
      deleteFiles([file._id]);
    }
  }, [deleteFiles]);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <h3>File explorer</h3>
          <p>Manage encrypted assets with MFA-protected actions.</p>
        </div>
        <div className={styles.viewToggle}>
          <button
            type="button"
            className={viewMode === 'grid' ? styles.active : ''}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            type="button"
            className={viewMode === 'list' ? styles.active : ''}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </header>

      {sortedFolders.length > 0 && (
        <div className={styles.foldersRow}>
          {sortedFolders.map((folder) => (
            <button
              type="button"
              key={folder._id}
              className={styles.folderCard}
              onClick={() => setCurrentFolder(folder._id)}
            >
              <span className={styles.folderIcon}>📁</span>
              <div>
                <strong>{folder.name}</strong>
                <p>{folder.fileCount ?? 0} items · {formatBytes(folder.totalSize || 0)}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {files.length === 0 ? (
        <div className={styles.emptyState}>
          <span>🔐</span>
          <p>No files match the current filters.</p>
          <small>Upload or adjust filters to continue.</small>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? styles.grid : styles.list}>
          {files.map((file) => (
            <FileCard
              key={file._id}
              file={file}
              isSelected={selectedFiles.includes(file._id)}
              onToggleSelect={toggleSelectFile}
              onPreview={handlePreview}
              onDownload={downloadFile}
              onShare={handleShare}
              onAccess={handleAccess}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FileExplorer;

