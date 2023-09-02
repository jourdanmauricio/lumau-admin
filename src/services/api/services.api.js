import { axiosApi } from '../api';

export const createServiceApi = async (formService) => {
  try {
    const data = JSON.parse(JSON.stringify(formService));
    delete data.id;
    delete data.updated;

    await axiosApi.post('/services', data);
    const newServices = await getAllServicesApi();

    return newServices;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el servicio 😞';
    throw message;
  }
};

export const getAllServicesApi = async () => {
  try {
    const response = await axiosApi.get('/services');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo el servicio 😞';
    throw message;
  }
};

export const updateServiceApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const service of data2) {
      if (service.updated === true) {
        const id = service.id;
        delete service.id;
        delete service.updated;
        delete service.createdAt;
        delete service.updatedAt;
        await axiosApi.put(`/services/${id}`, service);
      }
    }
    const newServices = await getAllServicesApi();
    return newServices;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el servicio 😞';
    throw message;
  }
};

export const deleteServiceApi = async (id) => {
  try {
    await axiosApi.delete(`/services/${id}`);
    const newServices = await getAllServicesApi();
    return newServices;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el servicio 😞';
    throw message;
  }
};
