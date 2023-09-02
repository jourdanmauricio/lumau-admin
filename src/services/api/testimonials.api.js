import { axiosApi } from '../api';

export const getAllTestimonialsApi = async () => {
  try {
    const response = await axiosApi.get('/testimonials');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo los testimonios 😞';
    throw message;
  }
};

export const createTestimonialApi = async (data2) => {
  try {
    const data = JSON.parse(JSON.stringify(data2));
    delete data.id;
    delete data.updated;
    await axiosApi.post('/testimonials', data);
    const newTestimonials = await getAllTestimonialsApi();
    return newTestimonials;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando testimonio 😞';
    throw message;
  }
};

export const updateTestimonialApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const testimonial of data2) {
      if (testimonial.updated === true) {
        const id = testimonial.id;
        delete testimonial.id;
        delete testimonial.updated;
        delete testimonial.createdAt;
        delete testimonial.updatedAt;
        await axiosApi.put(`/testimonials/${id}`, testimonial);
      }
    }
    const newTestimonials = await getAllTestimonialsApi();
    return newTestimonials;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando testimonio 😞';
    throw message;
  }
};

export const deleteTestimonialApi = async (id) => {
  try {
    await axiosApi.delete(`/testimonials/${id}`);
    const newTestimonials = await getAllTestimonialsApi();
    return newTestimonials;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando testimonio 😞';
    throw message;
  }
};
