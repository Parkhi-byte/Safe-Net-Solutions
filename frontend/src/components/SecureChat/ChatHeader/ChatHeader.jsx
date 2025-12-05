import React from 'react';
import { useChat } from '../../../contexts/ChatContext';
import styles from './ChatHeader.module.css';

const statusText = {
  online: 'Online',
  away: 'Away',
  offline: 'Offline'
};

const ChatHeader = ({ onToggleContacts }) => {
  const { activeChat } = useChat();

  if (!activeChat) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.mobileToggle} onClick={onToggleContacts} aria-label="Toggle contacts">
          ☰
        </button>

        <div className={styles.avatar}>{activeChat.avatar}</div>
        <div>
          <div className={styles.name}>
            {activeChat.name}
            {activeChat.isVerified && <span className={styles.verified}>Verified</span>}
          </div>
          <div className={styles.status}>
            <span className={`${styles.statusDot} ${styles[activeChat.status]}`} />
            {statusText[activeChat.status] || 'Unavailable'}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button">📞 Call</button>
        <button type="button">🎥 Video</button>
        <button type="button">⋮</button>
      </div>
    </header>
  );
};

export default ChatHeader;


