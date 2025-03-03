import axios from '../lib/axios';
import { API_ENDPOINTS } from '../config/api';
import { User, UpdateProfileDTO } from '../types';

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const { data } = await axios.get(API_ENDPOINTS.USERS.PROFILE);
    return data;
  },

  updateProfile: async (profileData: UpdateProfileDTO): Promise<User> => {
    const { data } = await axios.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
    return data;
  }
};