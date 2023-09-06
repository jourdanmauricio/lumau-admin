import { axiosApi } from '../api';

export const getFeatures = async () => {
  const features = await axiosApi.get('/features');
  return features;
};

export const getFeaturesByUser = async (id) => {
  const features = await axiosApi.get(`/features/user/${id}`);
  return features;
};

export const createFeature = async (feature) => {
  const newFeature = await axiosApi.post('/features', feature);
  return newFeature.data;
};

export const updateFeatures = async (id, features) => {
  // const { id } = user;
  // delete user.id;
  const updUser = await axiosApi.put(`/features/${id}`, features);
  return updUser.data;
};

export const deleteFeature = async (id) => {
  const user = await axiosApi.delete(`/features/${id}`);
  return user.data;
};
