import { axiosApi } from '../api';

export const getOffices = async (user) => {
  const response = await axiosApi.get('/offices', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createOffice = async (loan) => {
  const response = await axiosApi.post('/offices', loan);
  return response.data;
};

export const updateOffice = async (loan) => {
  const data = Object.assign({}, loan);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/offices/${id}`, data);
  return response.data;
};

export const deleteOffice = async (id) => {
  const response = await axiosApi.delete(`/offices/${id}`);
  return response.data;
};
