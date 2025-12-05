// Password strength calculation
export const calculatePasswordStrength = (password) => {
  if (!password || password.length === 0) {
    return { strength: 'none', score: 0, feedback: [] };
  }

  let score = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');
  
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include uppercase letters');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include numbers');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include special characters');
  }

  // Complexity bonus
  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  }

  // Determine strength
  let strength;
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 4) {
    strength = 'medium';
  } else if (score <= 6) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  return { strength, score, feedback };
};

// Generate random password
export const generatePassword = (options = {}) => {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  if (includeLowercase) charset += lowercase;
  if (includeUppercase) charset += uppercase;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  if (charset.length === 0) {
    charset = lowercase + uppercase + numbers + symbols;
  }

  let password = '';
  
  // Ensure at least one character from each selected type
  if (includeLowercase) password += lowercase[Math.floor(Math.random() * lowercase.length)];
  if (includeUppercase) password += uppercase[Math.floor(Math.random() * uppercase.length)];
  if (includeNumbers) password += numbers[Math.floor(Math.random() * numbers.length)];
  if (includeSymbols) password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

// Mask password for display
export const maskPassword = (password, visibleChars = 0) => {
  if (!password) return '';
  if (visibleChars === 0) return '•'.repeat(password.length);
  return password.slice(0, visibleChars) + '•'.repeat(password.length - visibleChars);
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Get website favicon URL
export const getFaviconUrl = (url) => {
  if (!url) return null;
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
};

// Validate URL
export const isValidUrl = (string) => {
  try {
    const url = string.startsWith('http') ? string : `https://${string}`;
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

