import React from 'react';
import styles from './MessageBubble.module.css';

const statusCopy = {
  sent: 'Sent',
  delivered: 'Delivered',
  read: 'Read'
};

const statusIcon = {
  sent: '↗',
  delivered: '✔',
  read: '✔✔'
};

const MessageBubble = ({ message, isOwn }) => {
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`${styles.row} ${isOwn ? styles.own : ''}`}>
      <div className={`${styles.bubble} ${isOwn ? styles.ownBubble : styles.peerBubble}`}>
        <div className={styles.header}>
          <span className={styles.encryptionBadge}>{message.isEncrypted ? 'E2EE' : 'Plain'}</span>
          {message.isHistorical && <span className={styles.history}>Recovered</span>}
        </div>
        {message.type === 'file' ? (
          <div className={styles.file}>
            <div className={styles.fileIcon}>📄</div>
            <div>
              <strong>{message.fileInfo?.name}</strong>
              <p>
                {message.fileInfo?.size} · {message.fileInfo?.type}
              </p>
            </div>
            <button type="button">⬇</button>
          </div>
        ) : (
          <p className={styles.text}>{message.content}</p>
        )}
        <div className={styles.meta}>
          <small>{timestamp}</small>
          <span className={styles.status}>
            {statusIcon[message.status] || '•'} {statusCopy[message.status] || 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;


