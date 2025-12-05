import React, { useState } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import styles from './ShareDialog.module.css';

const defaultExpiry = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

const ShareDialog = ({ file, onClose }) => {
  const { shareFile } = useFileContext();
  const [form, setForm] = useState({
    recipients: '',
    team: 'finance',
    permission: 'view',
    expires: defaultExpiry(),
    passwordProtected: true,
    password: '',
    downloadLimit: 5,
  });
  const [linkPreview, setLinkPreview] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    shareFile(file.id, {
      expires: new Date(form.expires).toISOString(),
      passwordProtected: form.passwordProtected,
      downloadLimit: Number(form.downloadLimit) || 5,
      permissions: {
        level: form.permission,
        recipients: form.recipients.split(',').map((entry) => entry.trim()).filter(Boolean),
        team: form.team,
      },
    });
    setLinkPreview(`https://safenet.com/share/${file.id.slice(-4)}${Date.now().toString(36)}`);
    setTimeout(onClose, 1500);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header>
          <div>
            <h3>Share “{file.name}”</h3>
            <p>Generate a zero-trust share link with policy controls.</p>
          </div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            Send to (emails)
            <input
              type="text"
              name="recipients"
              placeholder="alice@company.com, bob@company.com"
              value={form.recipients}
              onChange={handleChange}
            />
          </label>
          <label>
            Team
            <select name="team" value={form.team} onChange={handleChange}>
              <option value="finance">Finance</option>
              <option value="legal">Legal</option>
              <option value="sales">Sales</option>
              <option value="engineering">Engineering</option>
            </select>
          </label>
          <label>
            Permission level
            <div className={styles.permissions}>
              {['view', 'download', 'edit'].map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    name="permission"
                    value={level}
                    checked={form.permission === level}
                    onChange={handleChange}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          </label>
          <label>
            Expiration
            <input
              type="datetime-local"
              name="expires"
              value={form.expires}
              onChange={handleChange}
            />
          </label>
          <label className={styles.inline}>
            <input
              type="checkbox"
              name="passwordProtected"
              checked={form.passwordProtected}
              onChange={handleChange}
            />
            Require password
          </label>
          {form.passwordProtected && (
            <label>
              Password
              <input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Optional custom password"
              />
            </label>
          )}
          <label>
            Download limit
            <input
              type="number"
              name="downloadLimit"
              min="1"
              max="20"
              value={form.downloadLimit}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.primary}>
            Generate secure link
          </button>
        </form>
        {linkPreview && (
          <div className={styles.linkPreview}>
            <p>Share link ready:</p>
            <code>{linkPreview}</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareDialog;

