import React, { useEffect, useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import FileUpload from '../FileUpload/FileUpload';
import styles from './MessageInput.module.css';

const emojiPalette = ['😀', '🚀', '🔐', '🔥', '✅', '⚠️'];

const MessageInput = () => {
  const { sendMessage, activeChatId } = useChat();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    setMessage('');
    setError('');
    setShowEmoji(false);
    setShowUpload(false);
  }, [activeChatId]);

  const handleSend = () => {
    if (!message.trim()) {
      setError('Enter a message to send securely.');
      return;
    }

    setError('');
    setIsSending(true);
    try {
      sendMessage({ content: message.trim() });
      setMessage('');
    } catch (err) {
      setError('Failed to send. Secure channel unavailable.');
    } finally {
      setTimeout(() => setIsSending(false), 400);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleEmoji = emoji => {
    setMessage(prev => `${prev}${emoji}`);
    setShowEmoji(false);
  };

  const handleFileUpload = fileInfo => {
    sendMessage({
      content: fileInfo.name,
      type: 'file',
      fileInfo
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.statusRow}>
        <span className={styles.lock}>🔒 Encrypted</span>
        <span className={styles.connection}>Session integrity: stable</span>
      </div>
      <div className={styles.inputRow}>
        <button type="button" className={styles.iconButton} onClick={() => setShowEmoji(prev => !prev)}>
          😊
        </button>
        <button type="button" className={styles.iconButton} onClick={() => setShowUpload(true)}>
          📎
        </button>
        <textarea
          rows={1}
          placeholder="Write a secure message…"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className={styles.sendButton} onClick={handleSend} disabled={isSending}>
          {isSending ? 'Sending…' : 'Send'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}

      {showEmoji && (
        <div className={styles.emojiPicker}>
          {emojiPalette.map(emoji => (
            <button key={emoji} type="button" onClick={() => handleEmoji(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}

      {showUpload && <FileUpload onClose={() => setShowUpload(false)} onComplete={handleFileUpload} />}
    </div>
  );
};

export default MessageInput;


