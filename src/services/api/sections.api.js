import { axiosApi } from '../api';

export const getSections = async () => {
  const response = await axiosApi.get('/sections');
  return response.data;
};

export const createSection = async (section) => {
  const response = await axiosApi.post('/sections', section);
  return response.data;
};

export const updateSection = async (section) => {
  const data = Object.assign({}, section);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/sections/${id}`, data);
  return response.data;
};

export const deleteSection = async (id) => {
  const response = await axiosApi.delete(`/sections/${id}`);
  return response.data;
};
