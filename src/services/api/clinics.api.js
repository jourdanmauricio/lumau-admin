import { axiosApi } from '../api';

export const getAllClinicsApi = async () => {
  try {
    const response = await axiosApi.get('/clinics');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo las clínicas 😞';
    throw message;
  }
};

export const createClinicApi = async (data2) => {
  try {
    const data = JSON.parse(JSON.stringify(data2));
    delete data.id;
    delete data.updated;
    await axiosApi.post('/clinics', data);
    const newClinics = await getAllClinicsApi();
    return newClinics;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando la clínica 😞';
    throw message;
  }
};

export const updateClinicApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const clinic of data2) {
      if (clinic.updated === true) {
        const id = clinic.id;
        delete clinic.id;
        delete clinic.updated;
        delete clinic.createdAt;
        delete clinic.updatedAt;
        await axiosApi.put(`/clinics/${id}`, clinic);
      }
    }
    const newClinics = await getAllClinicsApi();
    return newClinics;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const deleteClinicApi = async (id) => {
  try {
    await axiosApi.delete(`/clinics/${id}`);
    const newClinics = await getAllClinicsApi();
    return newClinics;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el consultorio 😞';
    throw message;
  }
};
