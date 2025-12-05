import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState({});
  const [typingStatus, setTypingStatus] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [encryptionStatus] = useState({
    level: 'AES-256',
    keyExchange: 'Perfect Forward Secrecy',
    verified: true
  });

  const socket = useRef(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Connect to Socket.io
      socket.current = io('http://localhost:5000');

      socket.current.emit('join_chat', user._id);

      socket.current.on('receive_message', (message) => {
        handleIncomingMessage(message);
      });

      fetchContacts();

      return () => {
        socket.current.disconnect();
      };
    }
  }, [isAuthenticated, user]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/chat/contacts');
      setContacts(res.data.map(c => ({
        id: c._id,
        name: c.name,
        avatar: c.name.substring(0, 2).toUpperCase(),
        status: 'offline', // status not implemented in backend yet
        role: c.role || 'User'
      })));
      if (res.data.length > 0 && !activeChatId) {
        setActiveChatId(res.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const res = await axios.get(`/chat/${contactId}`);
      setMessages(prev => ({
        ...prev,
        [contactId]: res.data.map(msg => ({
          id: msg._id,
          senderId: msg.sender,
          receiverId: msg.receiver,
          content: msg.content,
          timestamp: msg.createdAt,
          type: msg.type,
          status: msg.status,
          isEncrypted: msg.isEncrypted,
          fileInfo: msg.fileInfo
        }))
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId);
    }
  }, [activeChatId]);

  const handleIncomingMessage = (message) => {
    const senderId = message.senderId;
    setMessages(prev => ({
      ...prev,
      [senderId]: [...(prev[senderId] || []), message]
    }));
  };

  const activeChat = useMemo(
    () => contacts.find(contact => contact.id === activeChatId) || null,
    [contacts, activeChatId]
  );

  const markAsRead = useCallback(contactId => {
    // Implement API call to mark as read
  }, []);

  const setActiveChat = useCallback(contactId => {
    setActiveChatId(contactId);
    markAsRead(contactId);
  }, [markAsRead]);

  const sendMessage = async ({ content, type = 'text', fileInfo = null }) => {
    if (!activeChatId || (!content && !fileInfo)) {
      return;
    }

    const newMessage = {
      receiverId: activeChatId,
      content,
      type,
      fileInfo
    };

    try {
      const res = await axios.post('/chat', newMessage);
      const savedMessage = res.data;

      const formattedMessage = {
        id: savedMessage._id,
        senderId: user._id,
        receiverId: activeChatId,
        content: savedMessage.content,
        timestamp: savedMessage.createdAt,
        type: savedMessage.type,
        status: savedMessage.status,
        isEncrypted: savedMessage.isEncrypted,
        fileInfo: savedMessage.fileInfo
      };

      // Emit to socket
      socket.current.emit('send_message', formattedMessage);

      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), formattedMessage]
      }));

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const value = {
    contacts,
    activeChat,
    activeChatId,
    messages,
    typingStatus,
    onlineUsers,
    encryptionStatus,
    setActiveChat,
    sendMessage,
    markAsRead,
    setTypingStatus,
    setOnlineUsers
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
