import React, { useState, useEffect } from 'react';
import { generatePassword } from '../../../utils/passwordUtils';
import { copyToClipboard } from '../../../utils/passwordUtils';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import styles from './PasswordGenerator.module.css';

const PasswordGenerator = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword({
      length,
      ...options
    });
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (password) {
      const success = await copyToClipboard(password);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleUsePassword = () => {
    if (password && onPasswordGenerated) {
      onPasswordGenerated(password);
    }
  };

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Generate password on mount and when options change
  useEffect(() => {
    if (Object.values(options).some(v => v)) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  return (
    <div className={styles.generator}>
      <h3 className={styles.title}>Password Generator</h3>
      
      <div className={styles.passwordDisplay}>
        <input
          type="text"
          value={password}
          readOnly
          className={styles.passwordInput}
          placeholder="Generated password will appear here"
        />
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          disabled={!password}
          aria-label="Copy password"
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>

      {password && <PasswordStrengthMeter password={password} />}

      <div className={styles.options}>
        <div className={styles.lengthControl}>
          <label className={styles.label}>
            Length: <span className={styles.lengthValue}>{length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.lengthLabels}>
            <span>8</span>
            <span>32</span>
          </div>
        </div>

        <div className={styles.checkboxes}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={() => handleOptionChange('includeUppercase')}
              className={styles.checkbox}
            />
            <span>Uppercase (A-Z)</span>
          </label>
          
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={() => handleOptionChange('includeLowercase')}
              className={styles.checkbox}
            />
            <span>Lowercase (a-z)</span>
          </label>
          
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={() => handleOptionChange('includeNumbers')}
              className={styles.checkbox}
            />
            <span>Numbers (0-9)</span>
          </label>
          
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={() => handleOptionChange('includeSymbols')}
              className={styles.checkbox}
            />
            <span>Symbols (!@#$%...)</span>
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.generateButton}
          onClick={handleGenerate}
        >
          🔄 Generate New
        </button>
        {onPasswordGenerated && password && (
          <button
            className={styles.useButton}
            onClick={handleUsePassword}
          >
            ✓ Use This Password
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;

