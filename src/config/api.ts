const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Toggle for mock data usage
export const USE_MOCK_DATA = false;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    LOGIN_EMAIL: `${API_URL}/auth/loginLw`,
    REGISTER: `${API_URL}/auth/register`,
    LOGOUT: `${API_URL}/auth/logout`,
    CURRENT_USER: `${API_URL}/auth/me`,
  },
  EVENTS: {
    LIST: `${API_URL}/events/`,
    DETAIL: (id: string) => `${API_URL}/events/${id}`,
    CREATE: `${API_URL}/events/`,
    UPDATE: (id: string) => `${API_URL}/events/${id}`,
    DELETE: (id: string) => `${API_URL}/events/${id}`,
    CANCEL: (id: string) => `${API_URL}/events/${id}/cancel`,
  },
  BOOKINGS: {
    LIST: `${API_URL}/bookings/`,
    USER_BOOKINGS: `${API_URL}/bookings/user`,
    DETAIL: (id: string) => `${API_URL}/bookings/${id}`,
    CREATE: `${API_URL}/bookings/`,
    CANCEL: (id: string) => `${API_URL}/bookings/${id}/cancel`,
  },
  USERS: {
    PROFILE: `${API_URL}/users/profile`,
    UPDATE_PROFILE: `${API_URL}/users/profile`,
  },
  PRESETS: `${API_URL}/presets`,
  TEMPLATES: {
    LIST: `${API_URL}/templates/`,
    DETAIL: (id: string) => `${API_URL}/templates/${id}`,
    CREATE: `${API_URL}/templates/`,
    UPDATE: (id: string) => `${API_URL}/templates/${id}`,
    DELETE: (id: string) => `${API_URL}/templates/${id}`,
  },
  PAYMENTS: {
    FPX: `${API_URL}/payments/fpx`,
  },
};