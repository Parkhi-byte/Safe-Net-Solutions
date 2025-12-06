import React, { useState, useEffect } from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import PasswordCard from '../PasswordCard/PasswordCard';
import PasswordForm from '../PasswordForm/PasswordForm';
import CategoriesFilter from '../CategoriesFilter/CategoriesFilter';
import SecurityOverview from '../SecurityOverview/SecurityOverview';
import styles from './PasswordVault.module.css';
import { Lock, Search, Plus, X, List, Grid, ShieldCheck } from 'lucide-react';

const PasswordVault = () => {
  const {
    filteredPasswords,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    isLocked,
    setIsLocked,
    updateActivity
  } = usePassword();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);

  useEffect(() => {
    updateActivity();
  }, [updateActivity]);

  const handleAddPassword = () => {
    setEditingPassword(null);
    setIsFormOpen(true);
    updateActivity();
  };

  const handleEditPassword = (password) => {
    setEditingPassword(password);
    setIsFormOpen(true);
    updateActivity();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPassword(null);
    updateActivity();
  };

  if (isLocked) {
    return (
      <div className={styles.lockedScreen}>
        <div className={styles.lockedContent}>
          <div className={styles.lockIcon}><Lock className="w-16 h-16 text-primary" /></div>
          <h2 className={styles.lockedTitle}>Vault Locked</h2>
          <p className={styles.lockedText}>
            Your password vault has been locked due to inactivity.
            Enter your master password to continue.
          </p>
          <button
            className={styles.unlockButton}
            onClick={() => {
              setIsLocked(false);
              updateActivity();
            }}
          >
            Unlock Vault
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.vault}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}><ShieldCheck className="w-8 h-8 text-primary inline-block mr-2" /></span>
              Password Manager
            </h1>
            <p className={styles.subtitle}>
              Securely store and manage all your passwords in one place
            </p>
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddPassword}
          >
            <span className={styles.addIcon}><Plus className="w-4 h-4 mr-2" /></span>
            Add Password
          </button>
        </div>

        <SecurityOverview />

        <div className={styles.controls}>
          <div className={styles.searchContainer}>

            <input
              type="text"
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateActivity();
              }}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                className={styles.clearSearch}
                onClick={() => {
                  setSearchTerm('');
                  updateActivity();
                }}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className={styles.controlsRight}>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateActivity();
              }}
              className={styles.sortSelect}
            >
              <option value="recent">Recently Updated</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>

            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => {
                  setViewMode('list');
                  updateActivity();
                }}
                aria-label="List view"
                title="List view"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => {
                  setViewMode('grid');
                  updateActivity();
                }}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <CategoriesFilter />

        {filteredPasswords.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><Search className="w-12 h-12 text-gray-300" /></div>
            <h3 className={styles.emptyTitle}>
              {searchTerm ? 'No passwords found' : 'No passwords yet'}
            </h3>
            <p className={styles.emptyText}>
              {searchTerm
                ? 'Try adjusting your search or filters'
                : 'Start securing your accounts by adding your first password'}
            </p>
            {!searchTerm && (
              <button
                className={styles.emptyButton}
                onClick={handleAddPassword}
              >
                Add Your First Password
              </button>
            )}
          </div>
        ) : (
          <div className={`${styles.passwordsGrid} ${styles[viewMode]}`}>
            {filteredPasswords.map(password => (
              <PasswordCard
                key={password.id}
                password={password}
                onEdit={handleEditPassword}
              />
            ))}
          </div>
        )}

      </div>

      <PasswordForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editingPassword={editingPassword}
      />
    </div>
  );
};

export default PasswordVault;

