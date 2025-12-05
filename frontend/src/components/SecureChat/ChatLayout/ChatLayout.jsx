import React, { useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import ContactList from '../ContactList/ContactList';
import ChatHeader from '../ChatHeader/ChatHeader';
import EncryptionStatus from '../EncryptionStatus/EncryptionStatus';
import ChatWindow from '../ChatWindow/ChatWindow';
import MessageInput from '../MessageInput/MessageInput';
import styles from './ChatLayout.module.css';

const ChatLayout = () => {
  const { activeChat } = useChat();
  const [mobileContactsOpen, setMobileContactsOpen] = useState(false);

  return (
    <section className={styles.chatSection}>
      <div className={styles.grid}>
        <aside className={`${styles.sidebar} ${mobileContactsOpen ? styles.sidebarVisible : ''}`}>
          <ContactList onSelectContact={() => setMobileContactsOpen(false)} />
        </aside>

        <div className={styles.chatArea}>
          {activeChat ? (
            <>
              <ChatHeader onToggleContacts={() => setMobileContactsOpen(prev => !prev)} />
              <EncryptionStatus />
              <ChatWindow />
              <MessageInput />
            </>
          ) : (
            <div className={styles.emptyState}>
              <h3>Select a contact to start secure messaging</h3>
              <p>Choose a teammate from the contact list to open an encrypted session.</p>
            </div>
          )}
        </div>
      </div>

      {mobileContactsOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close contacts"
          onClick={() => setMobileContactsOpen(false)}
        />
      )}
    </section>
  );
};

export default ChatLayout;


