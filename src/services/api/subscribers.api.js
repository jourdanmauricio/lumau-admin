import { axiosApi } from '../api';

export const getSubscribers = async () => {
  const response = await axiosApi.get('/subscribers');
  return response.data;
};

export const deleteSubscriber = async (id) => {
  const response = await axiosApi.delete(`/subscribers/${id}`);
  return response.data;
};
