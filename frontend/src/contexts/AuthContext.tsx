import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/utils/api'; // axios instance pointing to your backend

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage if token exists
  useEffect(() => {
    const token = localStorage.getItem('omnify_token');
    const storedUser = localStorage.getItem('omnify_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // attach token to axios
      } catch {
        localStorage.removeItem('omnify_token');
        localStorage.removeItem('omnify_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });

      const token = res.data.token;
      const userData: User = {
        id: res.data.id || '',
        name: res.data.name,
        email: res.data.email
      };

      localStorage.setItem('omnify_token', token);
      localStorage.setItem('omnify_user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });

      const token = res.data.token;
      const userData: User = {
        id: res.data.id || '',
        name: res.data.name,
        email: res.data.email
      };

      localStorage.setItem('omnify_token', token);
      localStorage.setItem('omnify_user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('omnify_token');
    localStorage.removeItem('omnify_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
