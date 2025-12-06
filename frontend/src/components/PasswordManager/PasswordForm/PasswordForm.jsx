import React, { useState, useEffect } from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import { calculatePasswordStrength, isValidUrl } from '../../../utils/passwordUtils';
import PasswordGenerator from '../PasswordGenerator/PasswordGenerator';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import { X, Wand2 } from 'lucide-react';
import styles from './PasswordForm.module.css';

const PasswordForm = ({ isOpen, onClose, editingPassword = null }) => {
  const { addPassword, updatePassword } = usePassword();
  const [formData, setFormData] = useState({
    website: '',
    url: '',
    username: '',
    password: '',
    category: 'Work',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [showGenerator, setShowGenerator] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Work', 'Social', 'Finance', 'Shopping', 'Entertainment', 'Other'];

  useEffect(() => {
    if (editingPassword) {
      setFormData({
        website: editingPassword.website || '',
        url: editingPassword.url || '',
        username: editingPassword.username || '',
        password: editingPassword.password || '',
        category: editingPassword.category || 'Work',
        notes: editingPassword.notes || ''
      });
    } else {
      setFormData({
        website: '',
        url: '',
        username: '',
        password: '',
        category: 'Work',
        notes: ''
      });
    }
    setErrors({});
    setShowGenerator(false);
  }, [editingPassword, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordGenerated = (generatedPassword) => {
    setFormData(prev => ({
      ...prev,
      password: generatedPassword
    }));
    setShowGenerator(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.website.trim()) {
      newErrors.website = 'Website/App name is required';
    }

    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username/Email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      const strength = calculatePasswordStrength(formData.password);
      if (strength.strength === 'weak') {
        newErrors.password = 'Password is too weak. Please use a stronger password.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Calculate password strength
    const strength = calculatePasswordStrength(formData.password);

    const passwordData = {
      ...formData,
      strength: strength.strength,
      url: formData.url.trim() || undefined
    };

    try {
      if (editingPassword) {
        updatePassword(editingPassword.id, passwordData);
      } else {
        addPassword(passwordData);
      }

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      onClose();
      setFormData({
        website: '',
        url: '',
        username: '',
        password: '',
        category: 'Work',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editingPassword ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="website" className={styles.label}>
              Website/App Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={`${styles.input} ${errors.website ? styles.error : ''}`}
              placeholder="e.g., Google, GitHub"
            />
            {errors.website && (
              <span className={styles.errorMessage}>{errors.website}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="url" className={styles.label}>
              URL (optional)
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={`${styles.input} ${errors.url ? styles.error : ''}`}
              placeholder="https://example.com"
            />
            {errors.url && (
              <span className={styles.errorMessage}>{errors.url}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username/Email <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${errors.username ? styles.error : ''}`}
              placeholder="user@example.com"
            />
            {errors.username && (
              <span className={styles.errorMessage}>{errors.username}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.label}>
                Password <span className={styles.required}>*</span>
              </label>
              <button
                type="button"
                className={styles.generatorToggle}
                onClick={() => setShowGenerator(!showGenerator)}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {showGenerator ? 'Hide Generator' : 'Use Generator'}
              </button>
            </div>

            {showGenerator ? (
              <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
            ) : (
              <>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.error : ''}`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password}</span>
                )}
                {formData.password && (
                  <PasswordStrengthMeter password={formData.password} />
                )}
              </>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={styles.textarea}
              rows="3"
              placeholder="Additional notes about this password..."
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                editingPassword ? 'Update Password' : 'Save Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;

