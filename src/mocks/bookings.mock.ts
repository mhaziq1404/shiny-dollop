import { Booking } from '../types';

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    eventId: '1',
    userId: 'user-1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    attendees: 2,
    attendeeInfo: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0123456789'
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '0123456780'
      }
    ]
  },
  {
    id: 'booking-2',
    eventId: '2',
    userId: 'user-1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    attendees: 1,
    attendeeInfo: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0123456789'
      }
    ]
  },
  {
    id: 'booking-3',
    eventId: '3',
    userId: 'user-1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    attendees: 3,
    attendeeInfo: [
      {
        name: 'John Doe',
        email: 'john@example.com'
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com'
      },
      {
        name: 'Jim Doe',
        email: 'jim@example.com'
      }
    ]
  }
];