// Security utilities and data protection functions
import CryptoJS from 'crypto-js';

// Encryption/Decryption utilities
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'meat-and-eat-secure-key-2024';

export const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Input validation and sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// XSS Protection
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// CSRF Protection
export const generateCSRFToken = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

export const validateCSRFToken = (token, storedToken) => {
  return token === storedToken;
};

// Rate limiting utilities
export const createRateLimiter = (maxRequests, windowMs) => {
  const requests = new Map();
  
  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, timestamps] of requests.entries()) {
      const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
      if (validTimestamps.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, validTimestamps);
      }
    }
    
    // Check current user's requests
    const userRequests = requests.get(identifier) || [];
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    validRequests.push(now);
    requests.set(identifier, validRequests);
    
    return true; // Request allowed
  };
};

// Secure storage utilities
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encryptedValue = encryptData(value);
      if (encryptedValue) {
        localStorage.setItem(key, encryptedValue);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Secure storage set error:', error);
      return false;
    }
  },
  
  getItem: (key) => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (encryptedValue) {
        return decryptData(encryptedValue);
      }
      return null;
    } catch (error) {
      console.error('Secure storage get error:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure storage remove error:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Secure storage clear error:', error);
      return false;
    }
  }
};

// Privacy utilities
export const anonymizeData = (data) => {
  const anonymized = { ...data };
  
  // Remove or hash sensitive fields
  if (anonymized.email) {
    anonymized.email = anonymized.email.replace(/(.{2}).*(@.*)/, '$1***$2');
  }
  
  if (anonymized.phone) {
    anonymized.phone = anonymized.phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
  }
  
  if (anonymized.address) {
    anonymized.address = anonymized.address.replace(/\d+/g, '***');
  }
  
  return anonymized;
};

// Cookie utilities with security flags
export const setSecureCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  const secureFlag = window.location.protocol === 'https:' ? 'Secure; ' : '';
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; ${secureFlag}SameSite=Strict; HttpOnly`;
};

export const getSecureCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteSecureCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Content Security Policy utilities
export const generateCSPNonce = () => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Data masking for logging
export const maskSensitiveData = (data) => {
  const sensitiveFields = ['password', 'ssn', 'creditCard', 'cvv', 'token'];
  const masked = { ...data };
  
  sensitiveFields.forEach(field => {
    if (masked[field]) {
      masked[field] = '***MASKED***';
    }
  });
  
  return masked;
};

// Session management
export const createSecureSession = (userData) => {
  const sessionId = CryptoJS.lib.WordArray.random(32).toString();
  const sessionData = {
    id: sessionId,
    userId: userData.id,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    ipAddress: '', // Will be set by server
    userAgent: navigator.userAgent
  };
  
  secureStorage.setItem('session', sessionData);
  return sessionId;
};

export const validateSession = () => {
  const session = secureStorage.getItem('session');
  if (!session) return false;
  
  const now = Date.now();
  const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
  
  if (now - session.lastActivity > sessionTimeout) {
    secureStorage.removeItem('session');
    return false;
  }
  
  // Update last activity
  session.lastActivity = now;
  secureStorage.setItem('session', session);
  
  return true;
};

// Audit logging
export const logSecurityEvent = (event, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details: maskSensitiveData(details),
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // In production, this would be sent to a secure logging service
  console.log('Security Event:', logEntry);
  
  // Store locally for debugging (remove in production)
  const logs = secureStorage.getItem('securityLogs') || [];
  logs.push(logEntry);
  
  // Keep only last 100 logs
  if (logs.length > 100) {
    logs.splice(0, logs.length - 100);
  }
  
  secureStorage.setItem('securityLogs', logs);
};

// Password strength checker
export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    score,
    strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong',
    checks
  };
};

// Two-factor authentication utilities
export const generateTOTPSecret = () => {
  return CryptoJS.lib.WordArray.random(20).toString();
};

export const generateTOTPCode = (secret, timeStep = 30) => {
  const time = Math.floor(Date.now() / 1000 / timeStep);
  const hmac = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(time.toString(16).padStart(16, '0')), secret);
  const code = hmac.words[hmac.words.length - 1] & 0x7fffffff;
  return (code % 1000000).toString().padStart(6, '0');
};

export const verifyTOTPCode = (secret, code, timeStep = 30, window = 1) => {
  const time = Math.floor(Date.now() / 1000 / timeStep);
  
  for (let i = -window; i <= window; i++) {
    const testCode = generateTOTPCode(secret, timeStep);
    if (testCode === code) {
      return true;
    }
  }
  
  return false;
};
