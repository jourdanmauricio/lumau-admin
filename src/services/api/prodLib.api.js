import { axiosApi } from '../api';

export const getProdLibs = async (user) => {
  const response = await axiosApi.get('/prod-lib', {
    headers: { 'Content-Type': 'application/json', url: user.url },
  });
  return response.data;
};

export const createProdLib = async (post) => {
  const response = await axiosApi.post('/prod-lib', post);
  return response.data;
};

export const massiveDeleteProdLib = async (data) => {
  try {
    const requests = data.map((prodLib) => {
      const url = `/prod-lib/${prodLib.id}`;
      return axiosApi
        .delete(url)
        .then((response) => ({ result: 'OK', response }))
        .catch((error) => {
          return {
            data: prodLib.id,
            result: 'ERROR',
            error: { data: { id: prodLib.id, error: error.message } },
          };
        });
    });

    const response = await Promise.allSettled(requests);
    return response;
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
};

export const massiveCreateOrUpdateProdLib = async (data) => {
  try {
    const requests = data.map((prodLib) => {
      const url = '/prod-lib/updateOrCreate';
      return axiosApi
        .put(url, prodLib)
        .then((response) => ({ result: 'OK', response }))
        .catch((error) => {
          return {
            data: prodLib.id,
            result: 'ERROR',
            error: { data: { id: prodLib.id, error: error.message } },
          };
        });
    });

    const response = await Promise.allSettled(requests);
    return response;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
};

export const updateProdLib = async (post) => {
  const data = Object.assign({}, post);
  const id = data.id;
  delete data.id;
  const response = await axiosApi.put(`/prod-lib/${id}`, data);
  return response.data;
};

export const deleteProdLib = async (id) => {
  const response = await axiosApi.delete(`/prod-lib/${id}`);
  return response.data;
};
