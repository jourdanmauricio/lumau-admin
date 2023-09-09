import { axiosApi } from '../api';

export const getLoans = async (user) => {
  const response = await axiosApi.get('/loans', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createLoan = async (loan) => {
  const response = await axiosApi.post('/loans', loan);
  return response.data;
};

export const updateLoan = async (loan) => {
  const data = Object.assign({}, loan);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/loans/${id}`, data);
  return response.data;
};

export const deleteLoan = async (id) => {
  const response = await axiosApi.delete(`/loans/${id}`);
  return response.data;
};
