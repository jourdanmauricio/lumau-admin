import { axiosApi } from '../api';

export const getPosts = async (user) => {
  const response = await axiosApi.get('/posts', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const importInstagram = async () => {
  const response = await axiosApi.post('/posts/import-instagram');
  return response.data;
};

export const createPost = async (post) => {
  const response = await axiosApi.post('/posts', post);
  return response.data;
};

export const updatePost = async (post) => {
  const data = Object.assign({}, post);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axiosApi.delete(`/posts/${id}`);
  return response.data;
};
