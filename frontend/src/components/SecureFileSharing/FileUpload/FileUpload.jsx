import React, { useEffect, useRef, useState } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import styles from './FileUpload.module.css';

const FileUpload = ({ uploadQueue }) => {
  const { uploadFiles, MAX_FILE_SIZE, formatBytes } = useFileContext();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const errorItem = uploadQueue.find((item) => item.status === 'error');

  useEffect(() => {
    if (errorItem) {
      setError(errorItem.error || 'Upload failed. Please try again.');
    } else {
      setError('');
    }
  }, [errorItem]);

  const handleFiles = (files) => {
    if (!files.length) return;
    uploadFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  return (
    <section
      className={`${styles.uploadCard} ${isDragging ? styles.dragging : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className={styles.header}>
        <h3>Secure upload</h3>
        <button type="button" onClick={() => inputRef.current?.click()}>
          Browse
        </button>
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={(event) => handleFiles(event.target.files)}
          style={{ display: 'none' }}
        />
      </div>
      <div className={styles.dropZone}>
        <span role="img" aria-label="upload">
          📤
        </span>
        <p>Drag & drop files here</p>
        <small>End-to-end encrypted with live progress & integrity checks.</small>
      </div>
      <div className={styles.meta}>
        <p>Max size per file: {formatBytes(MAX_FILE_SIZE)}</p>
        <p>Allowed types: PDF, Office, images, zip, text</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {uploadQueue.length > 0 && (
        <ul className={styles.queue}>
          {uploadQueue.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <small>{formatBytes(item.size)}</small>
              </div>
              <div className={styles.progressWrapper}>
                <span className={styles.status}>{item.status}</span>
                <div className={styles.progressBar}>
                  <span style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FileUpload;

