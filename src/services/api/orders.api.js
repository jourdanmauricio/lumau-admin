import { axiosApi } from '../api';

export const getOrders = async (user) => {
  const response = await axiosApi.get('/orders', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axiosApi.post('/orders', order);
  return response.data;
};

export const updateOrder = async (order) => {
  const data = Object.assign({}, order);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/orders/${id}`, data);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axiosApi.delete(`/orders/${id}`);
  return response.data;
};
