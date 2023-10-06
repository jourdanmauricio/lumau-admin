import { axiosApi } from '../api';

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
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${user.cloudName}/image/upload`;

  file.public_id = file.name;

  const formData = new FormData();
  formData.append('upload_preset', user.cloudPreset);
  formData.append('file', file);

  try {
    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const updateImage = async (image) => {
  const data = Object.assign({}, image);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/services/${id}`, data);
  return response.data;
};

export const deleteImage = async (id) => {
  const response = await axiosApi.delete(`/images/${id}`);
  return response.data;
};
