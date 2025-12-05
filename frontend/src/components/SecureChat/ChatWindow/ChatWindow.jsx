import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import MessageBubble from '../MessageBubble/MessageBubble';
import styles from './ChatWindow.module.css';

const formatDateLabel = isoString => {
  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const ChatWindow = () => {
  const { activeChatId, messages, typingStatus } = useChat();
  const [conversationSearch, setConversationSearch] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historicalMessages, setHistoricalMessages] = useState([]);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setHistoricalMessages([]);
  }, [activeChatId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, historicalMessages, conversationSearch]);

  const thread = useMemo(
    () => [...historicalMessages, ...(messages[activeChatId] || [])],
    [historicalMessages, messages, activeChatId]
  );

  const filteredThread = useMemo(() => {
    if (!conversationSearch.trim()) {
      return thread;
    }

    return thread.filter(message =>
      message.content?.toLowerCase().includes(conversationSearch.trim().toLowerCase())
    );
  }, [thread, conversationSearch]);

  const segmentedMessages = filteredThread.reduce((acc, message) => {
    const label = formatDateLabel(message.timestamp);
    if (!acc[label]) {
      acc[label] = [];
    }
    acc[label].push(message);
    return acc;
  }, {});

  const handleLoadHistory = () => {
    setIsLoadingHistory(true);
    setTimeout(() => {
      setHistoricalMessages(prev => [
        {
          id: `history-${Date.now()}`,
          senderId: activeChatId,
          receiverId: 'agent',
          content: 'Older encrypted transcript restored.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'text',
          status: 'read',
          isEncrypted: true,
          fileInfo: null,
          isHistorical: true
        },
        ...prev
      ]);
      setIsLoadingHistory(false);
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button type="button" onClick={handleLoadHistory} disabled={isLoadingHistory}>
          {isLoadingHistory ? 'Decrypting history…' : 'Load previous messages'}
        </button>
        <input
          type="search"
          placeholder="Search conversation"
          value={conversationSearch}
          onChange={event => setConversationSearch(event.target.value)}
        />
      </div>

      <div className={styles.messages} ref={containerRef}>
        {Object.keys(segmentedMessages).length === 0 && (
          <div className={styles.empty}>No messages match this search.</div>
        )}

        {Object.entries(segmentedMessages).map(([label, group]) => (
          <div key={label}>
            <div className={styles.separator}>
              <span>{label}</span>
            </div>
            {group.map(message => (
              <MessageBubble key={message.id} message={message} isOwn={message.senderId === 'agent'} />
            ))}
          </div>
        ))}

        {typingStatus[activeChatId] && (
          <div className={styles.typingIndicator}>
            <span />
            <span />
            <span />
            <p>Encrypted typing…</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;


