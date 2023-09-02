import { axiosApi } from '../api';

export const getSubscribers = async () => {
  try {
    const response = await axiosApi.get('/subscribers');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando suscriber 😞';
    throw message;
  }
};

export const createSubscriber = async (data) => {
  try {
    const response = await axiosApi.post('/subscribers', data);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo suscriptores 😞';
    throw message;
  }
};

export const deleteSubscriber = async (id) => {
  try {
    const response = await axiosApi.delete(`/subscribers/${id}`);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminado suscriptor 😞';
    throw message;
  }
};
