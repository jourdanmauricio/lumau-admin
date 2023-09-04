import { axiosApi } from '../api';

export const getContacts = async () => {
  const response = await axiosApi.get('/contacts');
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axiosApi.delete(`/contacts/${id}`);
  return response.data;
};
