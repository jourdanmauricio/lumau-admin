import { axiosApi } from '../api';

export const getUsers = async () => {
  const users = await axiosApi.get('/users');
  return users;
};

export const createUser = async (user) => {
  const newUser = await axiosApi.post('/users', user);
  return newUser.data;
};

export const updateUser = async (user) => {
  const { id } = user;
  delete user.id;
  const updUser = await axiosApi.put(`/users/${id}`, user);
  return updUser.data;
};

export const deleteUser = async (id) => {
  const user = await axiosApi.delete(`/users/${id}`);
  return user.data;
};
