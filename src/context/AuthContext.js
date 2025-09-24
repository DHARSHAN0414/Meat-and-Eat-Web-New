import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { secureStorage, logSecurityEvent, createSecureSession, validateSession } from '../utils/security';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing secure session
        const isValidSession = validateSession();
        
        if (isValidSession) {
          const userData = secureStorage.getItem('user');
          if (userData) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
            logSecurityEvent('SESSION_RESTORED', { userId: userData.id });
          }
        } else {
          // Clear invalid session
          secureStorage.removeItem('session');
          secureStorage.removeItem('user');
          localStorage.removeItem('userSession');
          logSecurityEvent('SESSION_EXPIRED');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logSecurityEvent('AUTH_INIT_ERROR', { error: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials with enhanced security
      if (email === 'demo@meatandeat.com' && password === 'demo123') {
        const user = {
          id: 'user_' + Date.now(),
          email: 'demo@meatandeat.com',
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
          role: 'customer',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        // Create secure session
        const sessionId = createSecureSession(user);
        
        // Store user data securely
        secureStorage.setItem('user', user);
        
        // Also store in regular localStorage for compatibility
        localStorage.setItem('userSession', JSON.stringify(user));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        
        logSecurityEvent('LOGIN_SUCCESS', { 
          userId: user.id, 
          email: user.email,
          sessionId 
        });
        
        return { success: true };
      } else {
        logSecurityEvent('LOGIN_FAILED', { 
          email, 
          reason: 'Invalid credentials' 
        });
        
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      logSecurityEvent('LOGIN_ERROR', { 
        email, 
        error: error.message 
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    const user = state.user;
    
    // Clear all secure storage
    secureStorage.removeItem('session');
    secureStorage.removeItem('user');
    localStorage.removeItem('userSession');
    
    // Clear any other sensitive data
    secureStorage.removeItem('cart');
    secureStorage.removeItem('searchHistory');
    
    dispatch({ type: 'LOGOUT' });
    
    logSecurityEvent('LOGOUT', { userId: user?.id });
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
