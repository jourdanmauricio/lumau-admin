import { create } from 'zustand';
import {
  getSections,
  createSection,
  deleteSection,
} from '@/services/api/sections.api';
import { updateSection } from '../services/api/sections.api';

export const useSectionsStore = create((set, get) => ({
  sections: [],
  error: null,
  currentData: { roles: 'admin, user' },
  action: 'VIEW',
  getAllSections: async () => {
    console.log('LOAD getAllSections');
    try {
      const data = await getSections();
      set({ sections: data, error: null, action: 'VIEW' });
    } catch (error) {
      let message = 'Error obteniendo las secciones';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      set({ error: message });
    }
  },
  setCurrentData: ({ payload }) => {
    set({ currentData: payload.data, action: payload.action, error: null });
  },
  handleAddSection: async (section) => {
    try {
      const { sections } = get();
      const data = await createSection(section);
      set({
        sections: [...sections, data],
        error: null,
        currentData: { roles: 'admin, user' },
        action: 'VIEW',
      });
    } catch (error) {
      let message = 'Error creando la sección';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      set({ error: message });

      throw message;
    }
  },
  handleUpdSection: async (data) => {
    try {
      const { sections } = get();
      const updSection = await updateSection(data);

      console.log('UPDATE SECTION', typeof updSection.id);
      console.log('SECTION[0]', typeof sections[0].id);

      const newSections = sections.map((section) =>
        section.id === updSection.id ? updSection : section
      );

      console.log('sections', newSections);
      set({
        sections: newSections,
        error: null,
        currentData: { roles: 'admin, user' },
        action: 'VIEW',
      });
    } catch (error) {
      let message = 'Error actualizando la sección';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      set({ error: message });
      throw message;
    }
  },
  handleDeleteSection: async (id) => {
    try {
      const { sections } = get();
      const data = await deleteSection(id);

      const newSections = sections.filter(
        (section) => section.id !== parseInt(data.id)
      );
      set({
        sections: newSections,
        error: null,
        currentData: { roles: 'admin, user' },
        action: 'VIEW',
      });
    } catch (error) {
      let message = 'Error eliminando la sección';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      set({ error: message });
      throw message;
    }
  },
}));
