import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const PasswordContext = createContext();

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error('usePassword must be used within PasswordProvider');
  }
  return context;
};

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('list');
  const [isLocked, setIsLocked] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { isAuthenticated } = useAuth();

  // Load passwords from API
  useEffect(() => {
    if (isAuthenticated) {
      fetchPasswords();
    } else {
      setPasswords([]);
    }
  }, [isAuthenticated]);

  const fetchPasswords = async () => {
    try {
      const res = await axios.get('/passwords');
      setPasswords(res.data);
    } catch (error) {
      console.error('Error loading passwords:', error);
    }
  };

  // Auto-lock after 5 minutes of inactivity
  useEffect(() => {
    const activityTimeout = setTimeout(() => {
      setIsLocked(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(activityTimeout);
  }, [lastActivity]);

  const updateActivity = () => {
    setLastActivity(Date.now());
    if (isLocked) {
      setIsLocked(false);
    }
  };

  const addPassword = async (passwordData) => {
    try {
      const res = await axios.post('/passwords', passwordData);
      setPasswords([res.data, ...passwords]);
      updateActivity();
      return res.data;
    } catch (error) {
      console.error('Error adding password:', error);
      throw error;
    }
  };

  const updatePassword = async (id, updatedData) => {
    try {
      const res = await axios.put(`/passwords/${id}`, updatedData);
      setPasswords(passwords.map(pwd =>
        pwd._id === id ? res.data : pwd
      ));
      updateActivity();
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`/passwords/${id}`);
      setPasswords(passwords.filter(pwd => pwd._id !== id));
      updateActivity();
    } catch (error) {
      console.error('Error deleting password:', error);
      throw error;
    }
  };

  // Filter and sort passwords
  const getFilteredPasswords = () => {
    let filtered = passwords;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pwd =>
        pwd.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pwd.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pwd.notes && pwd.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pwd => pwd.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered = [...filtered].sort((a, b) => a.website.localeCompare(b.website));
        break;
      case 'recent':
        filtered = [...filtered].sort((a, b) =>
          new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        break;
      case 'category':
        filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return filtered;
  };

  // Get all unique categories
  const getCategories = () => {
    const categories = ['All', ...new Set(passwords.map(pwd => pwd.category))];
    return categories;
  };

  // Security analysis
  const getSecurityStats = () => {
    const weakPasswords = passwords.filter(pwd => pwd.strength === 'weak');
    const reusedPasswords = findReusedPasswords();
    const totalCount = passwords.length;

    // Calculate security score (0-100)
    let score = 100;
    if (totalCount > 0) {
      score -= (weakPasswords.length / totalCount) * 40;
      score -= (reusedPasswords.length / totalCount) * 30;
    }

    return {
      totalCount,
      weakCount: weakPasswords.length,
      reusedCount: reusedPasswords.length,
      securityScore: Math.max(0, Math.round(score))
    };
  };

  const findReusedPasswords = () => {
    const passwordMap = new Map();
    passwords.forEach(pwd => {
      const key = pwd.password;
      if (!passwordMap.has(key)) {
        passwordMap.set(key, []);
      }
      passwordMap.get(key).push(pwd);
    });

    const reused = [];
    passwordMap.forEach((pwds, password) => {
      if (pwds.length > 1) {
        reused.push(...pwds);
      }
    });

    return reused;
  };

  const value = {
    passwords,
    filteredPasswords: getFilteredPasswords(),
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    isLocked,
    setIsLocked,
    addPassword,
    updatePassword,
    deletePassword,
    getCategories,
    getSecurityStats,
    updateActivity
  };

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  );
};
