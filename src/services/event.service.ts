import axios from '../lib/axios';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { Event, CreateEventDTO, UpdateEventDTO } from '../types';
import { mockEvents } from '../mocks/events.mock';
import { delay } from '../lib/utils';

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockEvents;
    }
    const { data } = await axios.get(API_ENDPOINTS.EVENTS.LIST);
    return data;
  },

  getEvent: async (id: string): Promise<Event> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const event = mockEvents.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      return event;
    }
    const { data } = await axios.get(API_ENDPOINTS.EVENTS.DETAIL(id));
    return data;
  },

  createEvent: async (eventData: CreateEventDTO): Promise<Event> => {
    if (USE_MOCK_DATA) {
      await delay(800);
      const newEvent: Event = {
        ...eventData,
        id: `event-${Date.now()}`,
        bookedSeats: 0,
        cancelled: false,
        requirements: eventData.requirements || [],
        activities: eventData.activities || []
      };
      mockEvents.push(newEvent);
      return newEvent;
    }
    const { data } = await axios.post(API_ENDPOINTS.EVENTS.CREATE, eventData);
    return data;
  },

  updateEvent: async (id: string, eventData: UpdateEventDTO): Promise<Event> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const index = mockEvents.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Event not found');
      
      const updatedEvent = {
        ...mockEvents[index],
        ...eventData,
        requirements: eventData.requirements || mockEvents[index].requirements,
        activities: eventData.activities || mockEvents[index].activities
      };
      
      mockEvents[index] = updatedEvent;
      return updatedEvent;
    }
    const { data } = await axios.put(API_ENDPOINTS.EVENTS.UPDATE(id), eventData);
    return data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const index = mockEvents.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Event not found');
      mockEvents.splice(index, 1);
      return;
    }
    await axios.delete(API_ENDPOINTS.EVENTS.DELETE(id));
  },

  cancelEvent: async (id: string, reason: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const event = mockEvents.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      
      // Update the event with cancellation details
      event.cancelled = true;
      event.cancellationReason = reason;
      return;
    }
    await axios.post(API_ENDPOINTS.EVENTS.CANCEL(id), { reason });
  }
};