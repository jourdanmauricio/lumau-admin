import Axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { config } from '@/config/config';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      token: null,
      isLogged: false,
      role: null,

      login: async (data) => {
        try {
          const response = await Axios.post(`${config.auth}/login`, data);
          set({
            user: response.data.user,
            isLogged: true,
            token: response.data.token,
            role: response.data.user.role,
          });
          return { status: 'SUCCESS', message: 'Bievenido!!! 💙' };
        } catch (error) {
          throw 'Verifique el username o contraseña';
        }
      },
      logout: () => {
        set({
          user: {},
          token: null,
          isLogged: false,
          role: null,
        });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
