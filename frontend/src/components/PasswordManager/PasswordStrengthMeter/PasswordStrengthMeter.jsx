import React from 'react';
import { calculatePasswordStrength } from '../../../utils/passwordUtils';
import styles from './PasswordStrengthMeter.module.css';

const PasswordStrengthMeter = ({ password }) => {
  const { strength, feedback } = calculatePasswordStrength(password);

  const getStrengthLabel = () => {
    switch (strength) {
      case 'none':
        return 'No Password';
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      case 'very-strong':
        return 'Very Strong';
      default:
        return 'Weak';
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'none':
        return '#e0e0e0';
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

  const getProgressWidth = () => {
    if (strength === 'none') return 0;
    if (strength === 'weak') return 25;
    if (strength === 'medium') return 50;
    if (strength === 'strong') return 75;
    if (strength === 'very-strong') return 100;
    return 0;
  };

  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Include lowercase letters', met: /[a-z]/.test(password) },
    { label: 'Include uppercase letters', met: /[A-Z]/.test(password) },
    { label: 'Include numbers', met: /[0-9]/.test(password) },
    { label: 'Include special characters', met: /[^a-zA-Z0-9]/.test(password) }
  ];

  if (!password) {
    return null;
  }

  return (
    <div className={styles.strengthMeter}>
      <div className={styles.header}>
        <span className={styles.label}>Password Strength:</span>
        <span 
          className={styles.strengthLabel}
          style={{ color: getStrengthColor() }}
        >
          {getStrengthLabel()}
        </span>
      </div>
      
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${getProgressWidth()}%`,
            backgroundColor: getStrengthColor()
          }}
        />
      </div>

      {feedback.length > 0 && (
        <div className={styles.feedback}>
          <p className={styles.feedbackTitle}>Requirements:</p>
          <ul className={styles.requirementsList}>
            {requirements.map((req, index) => (
              <li
                key={index}
                className={`${styles.requirement} ${req.met ? styles.met : styles.unmet}`}
              >
                <span className={styles.checkIcon}>
                  {req.met ? '✓' : '✗'}
                </span>
                {req.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;

