import axios from '../lib/axios';
import { LocationPreset, InstructorPreset } from '../types';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { delay } from '../lib/utils';

// Mock data for development
let locations: LocationPreset[] = [
  { id: '1', name: 'SIFOODOTCOM HQ, Sungai Besi', mapUrl: 'https://www.google.com/maps/place/SIFOODOTCOM+(Sifoo.com)/@3.062053,101.7037665,16z/data=!4m10!1m2!2m1!1sSIFOODOTCOM+HQ,+Sungai+Besi!3m6!1s0x31cc480524e80ecb:0xdbf2d7b70f22a45d!8m2!3d3.062053!4d101.708749!15sChtTSUZPT0RPVENPTSBIUSwgU3VuZ2FpIEJlc2laHCIac2lmb29kb3Rjb20gaHEgc3VuZ2FpIGJlc2mSAQ90cmFpbmluZ19jZW50ZXLgAQA!16s%2Fg%2F1hhn6cb4n?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D' },
];

let instructors: InstructorPreset[] = [
  { 
    id: '1', 
    name: 'Encik Imran',
    profileUrl: 'https://linkedin.com/in/imranabduljabar'
  },
  { 
    id: '2', 
    name: 'Encik Hay',
    profileUrl: 'https://linkedin.com/in/hay'
  },
];

export const presetService = {
  // Locations
  getLocations: async (): Promise<LocationPreset[]> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return locations;
    }
    const { data } = await axios.get(`${API_ENDPOINTS.PRESETS}/locations`);
    return data;
  },

  addLocation: async (location: { name: string; mapUrl?: string }): Promise<LocationPreset> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const newLocation = {
        id: Date.now().toString(),
        name: location.name,
        mapUrl: location.mapUrl
      };
      locations.push(newLocation);
      return newLocation;
    }
    const { data } = await axios.post(`${API_ENDPOINTS.PRESETS}/locations`, location);
    return data;
  },

  updateLocation: async (id: string, location: Partial<LocationPreset>): Promise<LocationPreset> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const index = locations.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Location not found');
      locations[index] = { ...locations[index], ...location };
      return locations[index];
    }
    const { data } = await axios.put(`${API_ENDPOINTS.PRESETS}/locations/${id}`, location);
    return data;
  },

  deleteLocation: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      locations = locations.filter(l => l.id !== id);
      return;
    }
    await axios.delete(`${API_ENDPOINTS.PRESETS}/locations/${id}`);
  },

  // Instructors
  getInstructors: async (): Promise<InstructorPreset[]> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return instructors;
    }
    const { data } = await axios.get(`${API_ENDPOINTS.PRESETS}/instructors`);
    return data;
  },

  addInstructor: async (instructor: { name: string; profileUrl?: string }): Promise<InstructorPreset> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const newInstructor = {
        id: Date.now().toString(),
        name: instructor.name,
        profileUrl: instructor.profileUrl
      };
      instructors.push(newInstructor);
      return newInstructor;
    }
    const { data } = await axios.post(`${API_ENDPOINTS.PRESETS}/instructors`, instructor);
    return data;
  },

  updateInstructor: async (id: string, instructor: Partial<InstructorPreset>): Promise<InstructorPreset> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const index = instructors.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Instructor not found');
      instructors[index] = { ...instructors[index], ...instructor };
      return instructors[index];
    }
    const { data } = await axios.put(`${API_ENDPOINTS.PRESETS}/instructors/${id}`, instructor);
    return data;
  },

  deleteInstructor: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      await delay(300);
      instructors = instructors.filter(i => i.id !== id);
      return;
    }
    await axios.delete(`${API_ENDPOINTS.PRESETS}/instructors/${id}`);
  },
};