import { axiosApi } from '../api';

export const getSlides = async (user) => {
  const response = await axiosApi.get('/slides', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createSlide = async (slide) => {
  const response = await axiosApi.post('/slides', slide);
  return response.data;
};

export const updateSlide = async (slide) => {
  const data = Object.assign({}, slide);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/slides/${id}`, data);
  return response.data;
};

export const deleteSlide = async (id) => {
  const response = await axiosApi.delete(`/slide/${id}`);
  return response.data;
};
