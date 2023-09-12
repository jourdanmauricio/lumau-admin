import { config } from '../../config/config';
import { axiosApi } from '../api';

export const getImages = async () => {
  const response = await axiosApi.get('/images', {
    headers: {
      'cloud-name': config.cloudName,
      'cloud-folder': config.cloudFolder,
      'api-key': config.apiKey,
      'api-secret': config.apiSecret,
    },
  });
  return response.data;
};

export const createImage = async (file) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dbep4ggne/image/upload`;

  console.log('FILE', file);
  file.public_id = file.name;
  // file.original_filename = file.name;

  const formData = new FormData();
  formData.append('upload_preset', 'ngjumjti');
  // formData.append('file', file);
  formData.append('file', file);

  try {
    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('RESSSSSSS', res);

    if (!res.ok) return null;

    const data = await res.json();
    // return data.secure_url;
    return data;
  } catch (error) {
    return null;
  }

  // const response = await axiosApi.post('/images/upload-file', file, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'cloud-folder': config.cloudFolder,
  //     'cloud-name': config.cloudName,
  //     'api-key': config.apiKey,
  //     'api-secret': config.apiSecret,
  //   },
  // });
  // return response.data;
};

export const deleteImage = async (id) => {
  const response = await axiosApi.delete(`/images`, {
    data: { public_id: id },
    headers: {
      'cloud-name': config.cloudName,
      'api-key': config.apiKey,
      'api-secret': config.apiSecret,
    },
  });
  return response.data;
};
