import api from './axios';
import { initializeSocket, disconnectSocket } from './socket';

export const login = async (email, password) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    initializeSocket(data.token);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/api/auth/register', userData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const verifyEmail = async (token) => {
  try {
    const { data } = await api.post('/api/auth/verify-email', { token });
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Email verification failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  disconnectSocket();
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};