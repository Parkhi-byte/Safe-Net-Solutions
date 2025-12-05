import React from 'react';
import { useChat } from '../../../contexts/ChatContext';
import styles from './ChatHeader.module.css';
import { Phone, Video, MoreVertical, Menu } from 'lucide-react';

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
          <Menu className="w-6 h-6" />
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
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors" title="Voice Call">
          <Phone className="w-5 h-5" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors" title="Video Call">
          <Video className="w-5 h-5" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors" title="More Options">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;


