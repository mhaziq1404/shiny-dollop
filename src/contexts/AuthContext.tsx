import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth.service';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const user = await authService.getCurrentUser();
          setUser(user);
          setIsAuthenticated(true);
          setIsAdmin(user.role === 'admin');
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: newUser, token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(newUser.role === 'admin');
      toast.success(`Welcome back, ${newUser.name}!`);
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    }
  };

  const loginWithEmail = async (email: string) => {
    try {
      const { user: newUser, token } = await authService.loginWithEmail(email);
      localStorage.setItem('token', token);
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(newUser.role === 'admin');
      toast.success(`Welcome back, ${newUser.name}!`);
    } catch (error) {
      toast.error('Authentication failed');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { user: newUser, token } = await authService.register(name, email, password);
      localStorage.setItem('token', token);
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(newUser.role === 'admin');
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAdmin, 
        isAuthenticated,
        login,
        loginWithEmail,
        register,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};