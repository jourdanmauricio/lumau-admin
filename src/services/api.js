import axios from 'axios';
import { useUserStore } from '@/store/user';
import { config } from '@/config/config';

export const axiosApi = axios.create({
  baseURL: config.endpoints,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
