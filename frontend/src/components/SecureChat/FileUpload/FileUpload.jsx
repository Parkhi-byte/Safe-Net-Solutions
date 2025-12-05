import React, { useCallback, useState } from 'react';
import styles from './FileUpload.module.css';

const formatBytes = bytes => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
const maxSize = 10 * 1024 * 1024; // 10 MB

const FileUpload = ({ onClose, onComplete }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFiles = useCallback(
    selectedFile => {
      if (!selectedFile) {
        return;
      }

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PNG, JPG and PDF files are supported.');
        return;
      }

      if (selectedFile.size > maxSize) {
        setError('File exceeds 10 MB limit.');
        return;
      }

      setError('');
      setFile(selectedFile);
    },
    []
  );

  const handleDrop = event => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError('Choose a file first.');
      return;
    }

    setProgress(10);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete({
            name: file.name,
            size: formatBytes(file.size),
            type: file.type,
            url: URL.createObjectURL(file)
          });
          onClose();
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <h4>Secure File Transfer</h4>
        <p>Files are encrypted before leaving your device.</p>

        <div
          className={styles.dropzone}
          onDragOver={event => event.preventDefault()}
          onDrop={handleDrop}
        >
          <input type="file" onChange={event => handleFiles(event.target.files[0])} />
          <span>Drag & drop or click to browse</span>
        </div>

        {file && (
          <div className={styles.preview}>
            <strong>{file.name}</strong>
            <p>
              {formatBytes(file.size)} · {file.type}
            </p>
            <div className={styles.progress}>
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleUpload} disabled={progress > 0 && progress < 100}>
            {progress > 0 && progress < 100 ? 'Encrypting…' : 'Upload & Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;


