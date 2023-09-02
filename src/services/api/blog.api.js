import { axiosApi } from '../api';

export const createPostApi = async (formPost) => {
  try {
    const data = JSON.parse(JSON.stringify(formPost));
    delete data.id;
    delete data.updated;

    await axiosApi.post('/posts', data);
    const newPosts = await getAllPostsApi();

    return newPosts;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const getAllPostsApi = async () => {
  try {
    const response = await axiosApi.get('/posts');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const updatePostApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const post of data2) {
      if (post.updated === true) {
        const id = post.id;
        delete post.id;
        delete post.updated;
        delete post.created;
        delete post.createdAt;
        delete post.updatedAt;
        await axiosApi.put(`/posts/${id}`, post);
      }
    }
    const newPosts = await getAllPostsApi();
    return newPosts;
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

export const deletePostApi = async (id) => {
  try {
    await axiosApi.delete(`/posts/${id}`);
    const newPosts = await getAllPostsApi();
    return newPosts;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el post 😞';
    throw message;
  }
};
