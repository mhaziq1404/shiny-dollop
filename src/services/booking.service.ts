import axios from '../lib/axios';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { Booking } from '../types';
import { mockBookings } from '../mocks/bookings.mock';
import { delay } from '../lib/utils';

export const bookingService = {
  getAllBookings: async (): Promise<Booking[]> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockBookings;
    }
    const { data } = await axios.get(API_ENDPOINTS.BOOKINGS.LIST);
    return data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockBookings;
    }
    const { data } = await axios.get(API_ENDPOINTS.BOOKINGS.USER_BOOKINGS);
    return data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) throw new Error('Booking not found');
      return booking;
    }
    const { data } = await axios.get(API_ENDPOINTS.BOOKINGS.DETAIL(id));
    return data;
  },

  createBooking: async (bookingData: any): Promise<Booking> => {
    if (USE_MOCK_DATA) {
      await delay(800);
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        eventId: bookingData.eventId,
        userId: 'user-1',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        attendees: bookingData.attendees,
        attendeeInfo: bookingData.attendeeInfo
      };
      mockBookings.push(newBooking);
      return newBooking;
    }
    const { data } = await axios.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
    return data;
  },

  updateBooking: async (id: string, updatedBooking: Booking): Promise<Booking> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const index = mockBookings.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Booking not found');
      mockBookings[index] = updatedBooking;
      return updatedBooking;
    }
    const { data } = await axios.put(API_ENDPOINTS.BOOKINGS.DETAIL(id), updatedBooking);
    return data;
  },

  updateAttendance: async (bookingId: string, attendeeIndex: number, attended: boolean): Promise<Booking> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const booking = mockBookings.find(b => b.id === bookingId);
      if (!booking) throw new Error('Booking not found');
      
      const updatedAttendeeInfo = [...booking.attendeeInfo];
      updatedAttendeeInfo[attendeeIndex] = {
        ...updatedAttendeeInfo[attendeeIndex],
        attended,
        attendedAt: attended ? new Date().toISOString() : null
      };

      const updatedBooking = {
        ...booking,
        attendeeInfo: updatedAttendeeInfo
      };

      const index = mockBookings.findIndex(b => b.id === bookingId);
      mockBookings[index] = updatedBooking;
      
      return updatedBooking;
    }
    
    const { data } = await axios.post(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(bookingId)}/attendance`,
      {
        attendeeIndex,
        attended,
        timestamp: new Date().toISOString()
      }
    );
    return data;
  },

  cancelBooking: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) throw new Error('Booking not found');
      booking.status = 'cancelled';
      return;
    }
    await axios.post(API_ENDPOINTS.BOOKINGS.CANCEL(id));
  }
};