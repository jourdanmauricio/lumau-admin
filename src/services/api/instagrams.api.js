import { axiosApi } from '../api';

export const getInstagrams = async (user) => {
  const response = await axiosApi.get('/instagrams', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const importInstagram = async () => {
  const response = await axiosApi.post('/instagrams');
  return response.data;
};

// export const authInstagram = async (data) => {
//   console.log('authInstagram', data);
//   const response = await axiosApi.post('/instagrams/changeAuthInstagram', data);
//   return response;
// };

export const updatePost = async (post) => {
  const data = Object.assign({}, post);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/instagrams/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axiosApi.delete(`/instagrams/${id}`);
  return response.data;
};
