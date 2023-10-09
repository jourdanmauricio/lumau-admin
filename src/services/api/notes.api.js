import { axiosApi } from '../api';

export const getAllNotes = async (user) => {
  const response = await axiosApi.get('/notes', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createNote = async (note) => {
  const response = await axiosApi.post('/notes', note);
  return response.data;
};

export const updateNote = async (note) => {
  const data = Object.assign({}, note);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axiosApi.delete(`/notes/${id}`);
  return response.data;
};
