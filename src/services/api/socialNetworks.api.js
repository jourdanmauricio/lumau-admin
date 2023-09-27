import { axiosApi } from '../api';

export const getNetworks = async (user) => {
  const response = await axiosApi.get('/networks', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createNetwork = async (loan) => {
  const response = await axiosApi.post('/networks', loan);
  return response.data;
};

export const updateNetwork = async (loan) => {
  const data = Object.assign({}, loan);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/networks/${id}`, data);
  return response.data;
};

export const deleteNetwork = async (id) => {
  const response = await axiosApi.delete(`/networks/${id}`);
  return response.data;
};
