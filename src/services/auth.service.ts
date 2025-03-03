import axios from '../lib/axios';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { User, LoginResponse } from '../types';
import { delay } from '../lib/utils';

// Mock users for testing
const mockUsers = {
  regular: {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'zaqwsxcde123',
    role: 'user' as const
  },
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'zaqwsxcde123',
    role: 'admin' as const
  }
};

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const user = Object.values(mockUsers).find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid credentials');
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: `mock-token-${user.role}-${Date.now()}`
      };
    }
    const { data } = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    return data;
  },

  // New method for email-only login
  loginWithEmail: async (email: string): Promise<LoginResponse> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const user = Object.values(mockUsers).find(u => u.email === email);
      if (!user) {
        // If user doesn't exist, create a new one
        const newUser = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0], // Use part before @ as name
          email,
          role: 'user' as const
        };
        return {
          user: newUser,
          token: `mock-token-user-${Date.now()}`
        };
      }
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: `mock-token-${user.role}-${Date.now()}`
      };
    }
    const { data } = await axios.post(API_ENDPOINTS.AUTH.LOGIN_EMAIL, { email });
    return data;
  },

  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    if (USE_MOCK_DATA) {
      await delay(800);
      if (Object.values(mockUsers).some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user' as const
      };
      return {
        user: newUser,
        token: `mock-token-${newUser.role}-${Date.now()}`
      };
    }
    const { data } = await axios.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return;
    }
    await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      if (token.includes('admin')) {
        const { password: _, ...adminUser } = mockUsers.admin;
        return adminUser;
      }
      const { password: _, ...regularUser } = mockUsers.regular;
      return regularUser;
    }
    const { data } = await axios.get(API_ENDPOINTS.AUTH.CURRENT_USER);
    return data;
  }
};