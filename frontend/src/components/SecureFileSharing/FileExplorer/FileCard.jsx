import React, { memo } from 'react';
import styles from './FileExplorer.module.css';
import { formatDate, formatBytes, getTypeColor } from '../../../utils/fileUtils';

const FileCard = memo(({ file, isSelected, onToggleSelect, onPreview, onDownload, onShare, onAccess, onRename, onDelete }) => {
    const color = getTypeColor(file.type);

    return (
        <article
            className={`${styles.fileCard} ${isSelected ? styles.selected : ''}`}
        >
            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(file._id)}
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
                    {formatBytes(file.size)} · Uploaded {formatDate(file.createdAt)}
                </p>
                <div className={styles.badges}>
                    <span className={styles.badge}>{file.encrypted ? 'Encrypted' : 'Plain'}</span>
                    <span className={styles.badge}>Shares {file.shareLinks?.length || 0}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={() => onPreview(file)}>
                    Preview
                </button>
                <button type="button" onClick={() => onDownload(file._id)}>
                    Download
                </button>
                <button type="button" onClick={() => onShare(file)}>
                    Share
                </button>
                <button type="button" onClick={() => onAccess(file)}>
                    Access
                </button>
                <button type="button" onClick={() => onRename(file)}>
                    Rename
                </button>
                <button type="button" onClick={() => onDelete(file)} className={styles.danger}>
                    Delete
                </button>
            </div>
        </article>
    );
}, (prev, next) => {
    return prev.file === next.file && prev.isSelected === next.isSelected;
});

export default FileCard;
