import React, { useMemo, useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import styles from './ContactList.module.css';

const statusColors = {
  online: '#2ecc71',
  away: '#f1c40f',
  offline: '#95a5a6'
};

const ContactList = ({ onSelectContact }) => {
  const { contacts, activeChatId, setActiveChat, typingStatus, onlineUsers } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const handleSelect = id => {
    setActiveChat(id);
    if (onSelectContact) {
      onSelectContact();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3>Secure Contacts</h3>
          <p>{onlineUsers.length} online · End-to-end encrypted</p>
        </div>
        <span className={styles.badge}>{contacts.length}</span>
      </div>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>

      <ul className={styles.list}>
        {filteredContacts.map(contact => (
          <li
            key={contact.id}
            className={`${styles.contact} ${contact.id === activeChatId ? styles.active : ''}`}
            onClick={() => handleSelect(contact.id)}
          >
            <div className={styles.avatar} aria-hidden>
              {contact.avatar}
              <span
                className={styles.statusDot}
                style={{ backgroundColor: statusColors[contact.status] || '#95a5a6' }}
              />
            </div>

            <div className={styles.meta}>
              <div className={styles.metaTop}>
                <strong>{contact.name}</strong>
                <small>
                  {contact.lastSeen
                    ? new Date(contact.lastSeen).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Online'}
                </small>
              </div>
              <div className={styles.metaBottom}>
                <span>{contact.role}</span>
                {typingStatus[contact.id] && <span className={styles.typing}>typing…</span>}
              </div>
            </div>

            {contact.unreadCount > 0 && <span className={styles.unread}>{contact.unreadCount}</span>}

            {contact.isVerified && <span className={styles.verified}>Verified</span>}
          </li>
        ))}

        {filteredContacts.length === 0 && (
          <li className={styles.empty}>No contacts match “{searchTerm}”.</li>
        )}
      </ul>
    </div>
  );
};

export default ContactList;


