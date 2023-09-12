import { axiosApi } from '../api';

export const getServices = async (user) => {
  const response = await axiosApi.get('/services', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createService = async (service) => {
  const response = await axiosApi.post('/services', service);
  return response.data;
};

export const updateService = async (service) => {
  const data = Object.assign({}, service);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await axiosApi.delete(`/services/${id}`);
  return response.data;
};
