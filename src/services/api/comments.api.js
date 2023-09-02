import { axiosApi } from '../api';

export const getComments = async () => {
  try {
    const response = await axiosApi.get('/comments');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo comentarios 😞';
    throw message;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axiosApi.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el cometario 😞';
    throw message;
  }
};
