import { axiosApi } from '../api';
// import crypto from 'crypto';

export const getImages = async (user) => {
  console.log('getImages');
  const response = await axiosApi.get('/images', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createImage = async (image) => {
  const response = await axiosApi.post('/images', image);
  return response.data;
};

export const createCloudImage = async (file, user) => {
  // const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${user.cloudName}/image/upload`;
  // const tags = user.cloudFolder;
  // file.public_id = file.name;
  // file.tags = tags;
  // console.log('file to cloudinary', file);
  // const formData = new FormData();
  // formData.append('upload_preset', user.cloudPreset);
  // formData.append('file', file);
  // formData.append('tags', tags);
  // try {
  //   const res = await fetch(cloudinaryUrl, {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   if (!res.ok) return null;
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   return null;
  // }
};

export const updateImage = async (image) => {
  const data = Object.assign({}, image);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/services/${id}`, data);
  return response.data;
};

export const deleteImage = async (id) => {
  const publicId = id.split('/')[1];

  const response = await axiosApi.delete(`/images/${publicId}`);
  return response.data;
};
