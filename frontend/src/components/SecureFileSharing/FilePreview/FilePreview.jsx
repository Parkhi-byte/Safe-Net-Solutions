import React from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import { formatDate } from '../../../utils/fileUtils';
import styles from './FilePreview.module.css';

const FilePreview = ({ file, onClose, onShare }) => {
  const { downloadFile, formatBytes } = useFileContext();
  if (!file) return null;

  const renderPreview = () => {
    if (file.type === 'image') {
      return <div className={styles.imagePreview}>Image preview unavailable in sandbox</div>;
    }
    if (file.type === 'pdf') {
      return <div className={styles.pdfPreview}>PDF preview placeholder</div>;
    }
    return <div className={styles.genericPreview}>Preview not available</div>;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <div>
            <h3>{file.name}</h3>
            <p>{file.encrypted ? 'AES-256 encrypted in transit' : 'Unencrypted'}</p>
          </div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <div className={styles.content}>
          <div className={styles.previewPane}>{renderPreview()}</div>
          <aside className={styles.metaPane}>
            <div className={styles.metaBlock}>
              <p>Size</p>
              <strong>{formatBytes(file.size)}</strong>
            </div>
            <div className={styles.metaBlock}>
              <p>Uploaded</p>
              <strong>{formatDate(file.uploadDate)}</strong>
            </div>
            <div className={styles.metaBlock}>
              <p>Uploaded by</p>
              <strong>{file.uploadedBy}</strong>
            </div>
            <div className={styles.metaBlock}>
              <p>Permissions</p>
              <strong>{file.permissions.canView?.length} viewers</strong>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={() => downloadFile(file.id)}>
                Download
              </button>
              <button type="button" onClick={() => onShare(file)}>
                Share
              </button>
            </div>

            <div className={styles.encryption}>
              <h4>Encryption status</h4>
              <ul>
                <li>End-to-end encrypted</li>
                <li>Zero-trust key exchange</li>
                <li>Watermarking {file.watermark ? 'enabled' : 'disabled'}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;

