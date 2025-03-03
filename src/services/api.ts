import { Event, Booking, User } from '../types';
import { mockEvents } from '../mocks/data';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
};

const mockAdmin: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    eventId: '1',
    userId: 'user-1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    attendees: 2
  },
  {
    id: 'booking-2',
    eventId: '2',
    userId: 'user-1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    attendees: 1
  }
];

export const eventService = {
  getEvents: async () => {
    await delay(500);
    return mockEvents;
  },
  
  getEvent: async (id: string) => {
    await delay(300);
    const event = mockEvents.find(e => e.id === id);
    if (!event) throw new Error('Event not found');
    return event;
  },

  createEvent: async (data: Event): Promise<Event> => {
    await delay(800);
    const newEvent = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockEvents.push(newEvent);
    return newEvent;
  },

  updateEvent: async (id: string, data: Partial<Event>): Promise<Event> => {
    await delay(800);
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    if (eventIndex === -1) throw new Error('Event not found');
    
    const updatedEvent = {
      ...mockEvents[eventIndex],
      ...data,
    };
    mockEvents[eventIndex] = updatedEvent;
    return updatedEvent;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await delay(500);
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    if (eventIndex === -1) throw new Error('Event not found');
    mockEvents.splice(eventIndex, 1);
  },
  
  createBooking: async (eventId: string, attendees: number): Promise<Booking> => {
    await delay(800);
    return {
      id: Math.random().toString(36).substr(2, 9),
      eventId,
      userId: 'user-1',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      attendees
    };
  }
};

export const bookingService = {
  getUserBookings: async () => {
    await delay(500);
    return mockBookings;
  },
  
  getBooking: async (id: string) => {
    await delay(300);
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  },
  
  cancelBooking: async (id: string) => {
    await delay(300);
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    booking.status = 'cancelled';
    return booking;
  }
};

export const userService = {
  getCurrentUser: async () => {
    await delay(300);
    return mockUser;
  },
  
  updateProfile: async (data: Partial<User>) => {
    await delay(500);
    Object.assign(mockUser, data);
    return mockUser;
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    await delay(500);
    if (email === mockUser.email && password === 'zaqwsxcde123') {
      return { token: 'fake-jwt-token', user: mockUser };
    }
    if (email === mockAdmin.email && password === 'zaqwsxcde123') {
      return { token: 'admin-jwt-token', user: mockAdmin };
    }
    throw new Error('Invalid email or password');
  },
  
  logout: async () => {
    await delay(300);
    return { message: 'Logged out successfully' };
  },
  
  register: async (name: string, email: string, password: string) => {
    await delay(800);
    if (email === mockUser.email) {
      throw new Error('Email already in use');
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user'
    };
    return { token: 'fake-jwt-token', user: newUser };
  },

  getCurrentUser: async () => {
    await delay(300);
    return mockUser;
  }
};