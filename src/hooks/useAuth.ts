import { useState, useEffect } from 'react';
import { User, LoginCredentials, SignUpData, ApiResponse } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Implement API call to check auth status
      const token = localStorage.getItem('token');
      if (token) {
        // Verify token with backend
        // setUser(userData);
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      // Implement login API call
      // const response = await api.post('/auth/login', credentials);
      // setUser(response.data.user);
      // localStorage.setItem('token', response.data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (data: SignUpData): Promise<ApiResponse<User>> => {
    try {
      // Implement signup API call
      // const response = await api.post('/auth/signup', data);
      // setUser(response.data.user);
      // localStorage.setItem('token', response.data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, login, signup, logout };
};