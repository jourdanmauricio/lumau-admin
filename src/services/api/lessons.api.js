import { axiosApi } from '../api';

export const getLessons = async (user) => {
  const response = await axiosApi.get('/lessons', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createLesson = async (lesson) => {
  const response = await axiosApi.post('/lessons', lesson);
  return response.data;
};

export const updateLesson = async (lesson) => {
  const data = Object.assign({}, lesson);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/lessons/${id}`, data);
  return response.data;
};

export const deleteLesson = async (id) => {
  const response = await axiosApi.delete(`/lessons/${id}`);
  return response.data;
};
