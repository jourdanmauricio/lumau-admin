import { axiosApi } from '../api';

export const login = async (data) => {
  try {
    const response = await axiosApi.post('/auth/login', data);
    const response2 = await axiosApi.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });
    response2.data.token = response.data.access_token;
    return response2.data;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Revise email y contraseña 😞';
    throw message;
  }
};

export const regeneratePage = async (repo) => {
  const response = await axiosApi.post('/auth/regenerate-page', repo);
  return response;
};

export const authInstagram = async (code, state) => {
  console.log('authInstagram', code, state);
  const response = await axiosApi.post('/auth/auth-instagram', {
    code: code,
    userId: state,
  });
  return response;
};
