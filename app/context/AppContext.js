"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    clientId: null,
    name: null,
    token: null,
    sessionId: null,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const clientId = localStorage.getItem('clientId');
        const name = localStorage.getItem('name');
        const sessionId = localStorage.getItem('sessionId');

        if (token && id) {
          setUser({
            id,
            clientId,
            name,
            token,
            sessionId,
          });
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function - store user data after OTP verification
  const login = (userData) => {
    try {
      const { id, name, token } = userData;
      
      // Store in localStorage
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      
      // If clientId and sessionId were stored during initial login, keep them
      const clientId = localStorage.getItem('clientId');
      const sessionId = localStorage.getItem('sessionId');

      // Update state
      setUser({
        id,
        clientId,
        name,
        token,
        sessionId,
      });
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Store session data from P1 (initial login)
  const storeSessionData = (sessionData) => {
    try {
      const { clientId, sessionId, name } = sessionData;
      
      localStorage.setItem('clientId', clientId);
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('name', name);

      setUser(prev => ({
        ...prev,
        clientId,
        sessionId,
        name,
      }));
    } catch (error) {
      console.error('Error storing session data:', error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('id');
      localStorage.removeItem('clientId');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      localStorage.removeItem('sessionId');

      // Reset state
      setUser({
        id: null,
        clientId: null,
        name: null,
        token: null,
        sessionId: null,
      });
      setIsAuthenticated(false);

      // Redirect to login
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Check if token is expired
  const isTokenExpired = () => {
    try {
      if (!user.token) return true;

      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) return true;

      const payload = JSON.parse(atob(tokenParts[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      
      return Date.now() >= exp;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  // Auto logout if token expired
  useEffect(() => {
    if (isAuthenticated && isTokenExpired()) {
      logout();
    }
  }, [isAuthenticated]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    storeSessionData,
    isTokenExpired,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};