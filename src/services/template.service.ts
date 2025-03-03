import axios from '../lib/axios';
import { EventTemplate } from '../types';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { delay } from '../lib/utils';

// Mock storage for development
let templates: EventTemplate[] = [];

export const templateService = {
  getTemplates: async (): Promise<EventTemplate[]> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return templates;
    }
    const { data } = await axios.get(API_ENDPOINTS.TEMPLATES.LIST);
    return data;
  },

  getTemplate: async (id: string): Promise<EventTemplate> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const template = templates.find(t => t.id === id);
      if (!template) throw new Error('Template not found');
      return template;
    }
    const { data } = await axios.get(API_ENDPOINTS.TEMPLATES.DETAIL(id));
    return data;
  },

  saveTemplate: async (name: string, eventDetails: any): Promise<EventTemplate> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const template: EventTemplate = {
        id: `template-${Date.now()}`,
        name,
        eventDetails: {
          ...eventDetails,
          activities: eventDetails.activities.map((activity: any) => ({
            ...activity,
            startTime: activity.startTime.toString().padStart(5, '0'),
            endTime: activity.endTime.toString().padStart(5, '0')
          }))
        },
        createdAt: new Date().toISOString(),
      };
      templates.push(template);
      return template;
    }
    const { data } = await axios.post(API_ENDPOINTS.TEMPLATES.CREATE, {
      name,
      eventDetails
    });
    return data;
  },

  updateTemplate: async (id: string, template: Partial<EventTemplate>): Promise<EventTemplate> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const index = templates.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Template not found');
      templates[index] = { ...templates[index], ...template };
      return templates[index];
    }
    const { data } = await axios.put(API_ENDPOINTS.TEMPLATES.UPDATE(id), template);
    return data;
  },

  deleteTemplate: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      templates = templates.filter(t => t.id !== id);
      return;
    }
    await axios.delete(API_ENDPOINTS.TEMPLATES.DELETE(id));
  },
};