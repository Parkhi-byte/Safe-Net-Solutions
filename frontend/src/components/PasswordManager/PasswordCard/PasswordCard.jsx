import React, { useState } from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import { copyToClipboard, getFaviconUrl } from '../../../utils/passwordUtils';
import { Copy, Check, Eye, EyeOff, Edit2, Trash2, ExternalLink } from 'lucide-react';
import styles from './PasswordCard.module.css';

const PasswordCard = ({ password: pwd, onEdit }) => {
  const { deletePassword, updateActivity } = usePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCopy = async (text, field) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      updateActivity();
    }
  };

  const handleDelete = () => {
    deletePassword(pwd.id);
    updateActivity();
    setShowDeleteConfirm(false);
  };

  const getStrengthColor = () => {
    switch (pwd.strength) {
      case 'weak':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'strong':
        return '#4caf50';
      case 'very-strong':
        return '#2e7d32';
      default:
        return '#e0e0e0';
    }
  };

  const getStrengthLabel = () => {
    return pwd.strength ? pwd.strength.charAt(0).toUpperCase() + pwd.strength.slice(1) : 'Unknown';
  };

  const faviconUrl = getFaviconUrl(pwd.url);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.websiteInfo}>
          {faviconUrl ? (
            <img src={faviconUrl} alt="" className={styles.favicon} />
          ) : (
            <div className={styles.faviconPlaceholder}>{pwd.website.charAt(0).toUpperCase()}</div>
          )}
          <div className={styles.websiteDetails}>
            <h3 className={styles.websiteName}>{pwd.website}</h3>
            {pwd.url && (
              <a
                href={pwd.url.startsWith('http') ? pwd.url : `https://${pwd.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.url}
                onClick={updateActivity}
              >
                {pwd.url.replace(/^https?:\/\//, '')}
                <ExternalLink size={12} className={styles.linkIcon} />
              </a>
            )}
          </div>
        </div>
        <div className={styles.categoryBadge} style={{ '--category-color': getCategoryColor(pwd.category) }}>
          {pwd.category}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.credentialRow}>
          <label className={styles.label}>Username/Email</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={pwd.username}
              readOnly
              className={styles.input}
            />
            <button
              className={`${styles.copyBtn} ${copiedField === 'username' ? styles.copied : ''}`}
              onClick={() => handleCopy(pwd.username, 'username')}
              aria-label="Copy username"
              title="Copy username"
            >
              {copiedField === 'username' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className={styles.credentialRow}>
          <label className={styles.label}>Password</label>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={pwd.password}
              readOnly
              className={styles.input}
            />
            <button
              className={styles.toggleBtn}
              onClick={() => {
                setShowPassword(!showPassword);
                updateActivity();
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button
              className={`${styles.copyBtn} ${copiedField === 'password' ? styles.copied : ''}`}
              onClick={() => handleCopy(pwd.password, 'password')}
              aria-label="Copy password"
              title="Copy password"
            >
              {copiedField === 'password' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className={styles.strengthIndicator}>
          <span className={styles.strengthLabel}>Strength:</span>
          <div className={styles.strengthBar}>
            <div
              className={styles.strengthFill}
              style={{
                width: getStrengthWidth(pwd.strength),
                backgroundColor: getStrengthColor(),
                boxShadow: `0 0 10px ${getStrengthColor()}`
              }}
            />
          </div>
          <span
            className={styles.strengthText}
            style={{ color: getStrengthColor() }}
          >
            {getStrengthLabel()}
          </span>
        </div>

        {pwd.notes && (
          <div className={styles.notes}>
            <span className={styles.notesLabel}>Notes:</span>
            <p className={styles.notesText}>{pwd.notes}</p>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button
          className={styles.actionBtn}
          onClick={() => {
            onEdit(pwd);
            updateActivity();
          }}
        >
          <Edit2 size={16} /> Edit
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => setShowDeleteConfirm(true)}
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div className={styles.deleteConfirm}>
          <div className={styles.deleteModal}>
            <p className={styles.deleteText}>
              Are you sure you want to delete the password for <strong>{pwd.website}</strong>?
            </p>
            <div className={styles.deleteActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    'Work': '#1a4d7a',
    'Social': '#00d4aa',
    'Finance': '#ff9800',
    'Shopping': '#9c27b0',
    'Entertainment': '#f44336',
    'Other': '#666666'
  };
  return colors[category] || colors['Other'];
};

const getStrengthWidth = (strength) => {
  switch (strength) {
    case 'weak':
      return '25%';
    case 'medium':
      return '50%';
    case 'strong':
      return '75%';
    case 'very-strong':
      return '100%';
    default:
      return '0%';
  }
};

export default PasswordCard;

