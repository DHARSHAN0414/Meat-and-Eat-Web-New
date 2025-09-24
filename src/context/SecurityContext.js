import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  secureStorage, 
  validateSession, 
  logSecurityEvent, 
  createSecureSession,
  sanitizeInput,
  validateEmail,
  validatePassword,
  createRateLimiter
} from '../utils/security';

const SecurityContext = createContext();

const securityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PRIVACY_SETTINGS':
      return { ...state, privacySettings: action.payload };
    case 'SET_SECURITY_LEVEL':
      return { ...state, securityLevel: action.payload };
    case 'SET_TWO_FACTOR_ENABLED':
      return { ...state, twoFactorEnabled: action.payload };
    case 'SET_SESSION_EXPIRED':
      return { ...state, sessionExpired: action.payload };
    case 'SET_SECURITY_ALERTS':
      return { ...state, securityAlerts: action.payload };
    case 'CLEAR_SESSION':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        sessionExpired: false
      };
    default:
      return state;
  }
};

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null,
  privacySettings: {
    dataCollection: true,
    analytics: true,
    marketing: false,
    cookies: 'essential',
    locationTracking: false
  },
  securityLevel: 'standard', // standard, enhanced, maximum
  twoFactorEnabled: false,
  sessionExpired: false,
  securityAlerts: []
};

export const SecurityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(securityReducer, initialState);
  
  // Rate limiting for login attempts
  const loginRateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

  // Initialize security context
  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        // Validate existing session
        const isValidSession = validateSession();
        
        if (isValidSession) {
          const user = secureStorage.getItem('user');
          if (user) {
            dispatch({ type: 'SET_AUTHENTICATED', payload: true });
            dispatch({ type: 'SET_USER', payload: user });
            logSecurityEvent('SESSION_VALIDATED', { userId: user.id });
          }
        } else {
          // Clear invalid session
          secureStorage.removeItem('session');
          secureStorage.removeItem('user');
          dispatch({ type: 'CLEAR_SESSION' });
          logSecurityEvent('SESSION_EXPIRED');
        }
        
        // Load privacy settings
        const privacySettings = secureStorage.getItem('privacySettings') || initialState.privacySettings;
        dispatch({ type: 'SET_PRIVACY_SETTINGS', payload: privacySettings });
        
        // Load security settings
        const securityLevel = secureStorage.getItem('securityLevel') || 'standard';
        dispatch({ type: 'SET_SECURITY_LEVEL', payload: securityLevel });
        
        const twoFactorEnabled = secureStorage.getItem('twoFactorEnabled') || false;
        dispatch({ type: 'SET_TWO_FACTOR_ENABLED', payload: twoFactorEnabled });
        
        // Load security alerts
        const securityAlerts = secureStorage.getItem('securityAlerts') || [];
        dispatch({ type: 'SET_SECURITY_ALERTS', payload: securityAlerts });
        
      } catch (error) {
        console.error('Security initialization error:', error);
        logSecurityEvent('SECURITY_INIT_ERROR', { error: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeSecurity();
  }, []);

  // Secure login function
  const login = async (email, password, rememberMe = false) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Rate limiting check
      const clientId = navigator.userAgent + window.location.hostname;
      if (!loginRateLimiter(clientId)) {
        logSecurityEvent('LOGIN_RATE_LIMITED', { email });
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      // Input validation and sanitization
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);
      
      if (!validateEmail(sanitizedEmail)) {
        throw new Error('Invalid email format');
      }
      
      if (!validatePassword(sanitizedPassword)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      }
      
      // Simulate API call (replace with actual authentication)
      const mockUser = {
        id: 'user_' + Date.now(),
        email: sanitizedEmail,
        name: 'John Doe',
        role: 'customer',
        lastLogin: new Date().toISOString(),
        loginAttempts: 0
      };
      
      // Create secure session
      const sessionId = createSecureSession(mockUser);
      
      // Store user data securely
      secureStorage.setItem('user', mockUser);
      
      // Set session timeout based on remember me
      const sessionTimeout = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      dispatch({ type: 'SET_USER', payload: mockUser });
      
      logSecurityEvent('LOGIN_SUCCESS', { 
        userId: mockUser.id, 
        email: sanitizedEmail,
        rememberMe,
        sessionTimeout 
      });
      
      return { success: true, user: mockUser };
      
    } catch (error) {
      logSecurityEvent('LOGIN_FAILED', { 
        email: sanitizeInput(email),
        error: error.message 
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Secure logout function
  const logout = () => {
    try {
      const user = state.user;
      
      // Clear all secure storage
      secureStorage.removeItem('session');
      secureStorage.removeItem('user');
      secureStorage.removeItem('cart');
      
      // Clear session cookies
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      dispatch({ type: 'CLEAR_SESSION' });
      
      logSecurityEvent('LOGOUT', { userId: user?.id });
      
    } catch (error) {
      console.error('Logout error:', error);
      logSecurityEvent('LOGOUT_ERROR', { error: error.message });
    }
  };

  // Update privacy settings
  const updatePrivacySettings = (newSettings) => {
    try {
      const updatedSettings = { ...state.privacySettings, ...newSettings };
      secureStorage.setItem('privacySettings', updatedSettings);
      dispatch({ type: 'SET_PRIVACY_SETTINGS', payload: updatedSettings });
      
      logSecurityEvent('PRIVACY_SETTINGS_UPDATED', { settings: newSettings });
      
    } catch (error) {
      console.error('Privacy settings update error:', error);
      logSecurityEvent('PRIVACY_UPDATE_ERROR', { error: error.message });
    }
  };

  // Update security level
  const updateSecurityLevel = (level) => {
    try {
      secureStorage.setItem('securityLevel', level);
      dispatch({ type: 'SET_SECURITY_LEVEL', payload: level });
      
      logSecurityEvent('SECURITY_LEVEL_UPDATED', { level });
      
    } catch (error) {
      console.error('Security level update error:', error);
      logSecurityEvent('SECURITY_LEVEL_ERROR', { error: error.message });
    }
  };

  // Enable/disable two-factor authentication
  const toggleTwoFactor = (enabled) => {
    try {
      secureStorage.setItem('twoFactorEnabled', enabled);
      dispatch({ type: 'SET_TWO_FACTOR_ENABLED', payload: enabled });
      
      logSecurityEvent('TWO_FACTOR_TOGGLED', { enabled });
      
    } catch (error) {
      console.error('Two-factor toggle error:', error);
      logSecurityEvent('TWO_FACTOR_ERROR', { error: error.message });
    }
  };

  // Add security alert
  const addSecurityAlert = (alert) => {
    try {
      const newAlert = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: alert.type || 'info',
        message: alert.message,
        read: false
      };
      
      const updatedAlerts = [...state.securityAlerts, newAlert];
      secureStorage.setItem('securityAlerts', updatedAlerts);
      dispatch({ type: 'SET_SECURITY_ALERTS', payload: updatedAlerts });
      
      logSecurityEvent('SECURITY_ALERT_CREATED', { alert: newAlert });
      
    } catch (error) {
      console.error('Security alert error:', error);
    }
  };

  // Mark security alert as read
  const markAlertAsRead = (alertId) => {
    try {
      const updatedAlerts = state.securityAlerts.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      );
      
      secureStorage.setItem('securityAlerts', updatedAlerts);
      dispatch({ type: 'SET_SECURITY_ALERTS', payload: updatedAlerts });
      
    } catch (error) {
      console.error('Mark alert as read error:', error);
    }
  };

  // Clear all security alerts
  const clearSecurityAlerts = () => {
    try {
      secureStorage.setItem('securityAlerts', []);
      dispatch({ type: 'SET_SECURITY_ALERTS', payload: [] });
      
    } catch (error) {
      console.error('Clear alerts error:', error);
    }
  };

  // Check if user has permission for action
  const hasPermission = (action) => {
    if (!state.user) return false;
    
    const permissions = {
      customer: ['view_products', 'add_to_cart', 'place_order', 'view_profile'],
      admin: ['view_products', 'add_to_cart', 'place_order', 'view_profile', 'manage_products', 'manage_orders', 'manage_users', 'view_analytics'],
      super_admin: ['*'] // All permissions
    };
    
    const userPermissions = permissions[state.user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
  };

  // Get security status
  const getSecurityStatus = () => {
    return {
      isAuthenticated: state.isAuthenticated,
      securityLevel: state.securityLevel,
      twoFactorEnabled: state.twoFactorEnabled,
      sessionValid: validateSession(),
      unreadAlerts: state.securityAlerts.filter(alert => !alert.read).length,
      lastLogin: state.user?.lastLogin
    };
  };

  const value = {
    ...state,
    login,
    logout,
    updatePrivacySettings,
    updateSecurityLevel,
    toggleTwoFactor,
    addSecurityAlert,
    markAlertAsRead,
    clearSecurityAlerts,
    hasPermission,
    getSecurityStatus
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
