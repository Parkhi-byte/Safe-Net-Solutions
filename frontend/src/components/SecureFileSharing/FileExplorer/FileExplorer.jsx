import React, { useMemo, useState } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import { formatDate, formatBytes, getTypeColor } from '../../../utils/fileUtils';
import styles from './FileExplorer.module.css';

const FileExplorer = ({ folders = [], files = [], onPreview, onShare, onAccess }) => {
  const { toggleSelectFile, selectedFiles, setCurrentFolder, downloadFile, renameItem, deleteFiles } =
    useFileContext();
  const [viewMode, setViewMode] = useState('grid');

  const sortedFolders = useMemo(() => [...folders].sort((a, b) => a.name.localeCompare(b.name)), [folders]);

  const handleShare = (file) => onShare && onShare(file.id);
  const handlePreview = (file) => onPreview && onPreview(file);
  const handleAccess = (file) => onAccess && onAccess(file);
  const handleRename = (file) => {
    const nextName = window.prompt('Rename file', file.name);
    if (nextName && nextName !== file.name) {
      renameItem(file.id, 'file', nextName.trim());
    }
  };
  const handleDelete = (file) => {
    if (window.confirm(`Delete ${file.name}?`)) {
      deleteFiles([file.id]);
    }
  };

  const renderFileCard = (file) => {
    const isSelected = selectedFiles.includes(file.id);
    const color = getTypeColor(file.type);
    return (
      <article
        key={file.id}
        className={`${styles.fileCard} ${isSelected ? styles.selected : ''}`}
      >
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelectFile(file.id)}
          />
          <span />
        </label>
        <div className={styles.fileIcon} style={{ background: `${color}20`, color }}>
          {file.type?.slice(0, 3).toUpperCase()}
        </div>
        <div className={styles.fileMeta}>
          <div className={styles.fileHeader}>
            <h4>{file.name}</h4>
            {file.watermark && <span className={styles.watermark}>Watermarked</span>}
          </div>
          <p>
            {formatBytes(file.size)} · Uploaded {formatDate(file.uploadDate)} by {file.uploadedBy}
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>{file.encrypted ? 'Encrypted' : 'Plain'}</span>
            <span className={styles.badge}>View {file.permissions.canView?.length}</span>
            <span className={styles.badge}>DL {file.permissions.canDownload?.length}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => handlePreview(file)}>
            Preview
          </button>
          <button type="button" onClick={() => downloadFile(file.id)}>
            Download
          </button>
          <button type="button" onClick={() => handleShare(file)}>
            Share
          </button>
          <button type="button" onClick={() => handleAccess(file)}>
            Access
          </button>
          <button type="button" onClick={() => handleRename(file)}>
            Rename
          </button>
          <button type="button" onClick={() => handleDelete(file)} className={styles.danger}>
            Delete
          </button>
        </div>
      </article>
    );
  };

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
              key={folder.id}
              className={styles.folderCard}
              onClick={() => setCurrentFolder(folder.id)}
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
      ) : viewMode === 'grid' ? (
        <div className={styles.grid}>{files.map(renderFileCard)}</div>
      ) : (
        <div className={styles.list}>{files.map(renderFileCard)}</div>
      )}
    </section>
  );
};

export default FileExplorer;

