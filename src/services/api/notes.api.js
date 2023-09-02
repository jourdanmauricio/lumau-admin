import { axiosApi } from '../api';

export const getAllNotes = async () => {
  try {
    const response = await axiosApi.get('/notes');
    return response.data;
  } catch (error) {
    let message = 'Error obteniendo las notas 😞';
    if (error.response) {
      message = error.response.data
        ? `${error.response.data.statusCode}: ${error.response.data.message}`
        : 'Error obteniendo las notas 😞';
    }
    throw message;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axiosApi.post('/notes', note);
    return response.data;
  } catch (error) {
    let message = 'Error creando la nota 😞';
    if (error.response) {
      message = error.response.data
        ? `${error.response.data.statusCode}: ${error.response.data.message}`
        : 'Error creando la nota 😞';
    }
    throw message;
  }
};

export const updateNote = async (note) => {
  try {
    const data = Object.assign({}, note);
    const id = data.id;
    delete data.id;
    const response = await axiosApi.put(`/notes/${id}`, data);
    return response.data;
  } catch (error) {
    let message = '';
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el cometario 😞';
    throw message;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axiosApi.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    let message = 'Error eliminando la nota 😞';
    if (error.response) {
      message = error.response.data
        ? `${error.response.data.statusCode}: ${error.response.data.message}`
        : 'Error eliminando la nota 😞';
    }
    throw message;
  }
};
