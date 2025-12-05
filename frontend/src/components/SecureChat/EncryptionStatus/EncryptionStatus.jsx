import React from 'react';
import { useChat } from '../../../contexts/ChatContext';
import styles from './EncryptionStatus.module.css';

const EncryptionStatus = () => {
  const { encryptionStatus, activeChat } = useChat();

  if (!activeChat) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.lock}>
        <span role="img" aria-label="Lock">
          🔐
        </span>
      </div>
      <div>
        <strong>End-to-end encryption enabled</strong>
        <p>
          {encryptionStatus.level} · {encryptionStatus.keyExchange}
        </p>
      </div>
      <div className={styles.badges}>
        <span>Perfect Forward Secrecy</span>
        <span>Session verified</span>
      </div>
    </div>
  );
};

export default EncryptionStatus;


