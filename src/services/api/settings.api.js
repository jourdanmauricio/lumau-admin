import { axiosApi } from '../api';

export const getSettingsApi = async () => {
  try {
    const response = await axiosApi.get(`/settings`);
    return response.data;
  } catch (err) {
    let message = '';
    message = err.response.data
      ? `${err.response.status}: ${err.response.statusText} - ${err.response.data}`
      : 'Error Obteniendo configuración 😞';
    throw message;
  }
};

export const updateSettingsApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const setting of data2) {
      if (setting.updated === true) {
        const id = setting.id;
        delete setting.id;
        delete setting.updated;
        delete setting.createdAt;
        delete setting.updatedAt;
        await axiosApi.put(`/settings/${id}`, setting);
      }
    }
    const newSettings = await getSettingsApi();
    return newSettings;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.status}: ${error.response.statusText}`
      : 'Error modificando la configuración 😞';
    throw message;
  }
};
