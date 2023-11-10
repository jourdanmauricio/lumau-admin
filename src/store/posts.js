import { create } from 'zustand';
import checkForm from '@/utils/checkForm';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from '@/services/api/posts.api.js';
import { useUserStore } from './user';

export const usePostsStore = create((set, get) => ({
  posts: [],
  error: null,
  currentData: {},
  action: 'VIEW',
  loading: false,
  resetPaginationToggle: false,
  selectedRows: [],
  toggledClearRows: false,
  filter: {
    filterSection: '',
    filterText: '',
  },
  getAllPosts: async () => {
    const user = useUserStore.getState();

    try {
      const data = await getPosts(user.user);
      set({ posts: data, error: null, action: 'VIEW' });
    } catch (error) {
      let message = 'Error obteniendo los posts';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      set({ error: message });
    }
  },

  setCurrentData: ({ payload }) => {
    set({ currentData: payload.data, action: payload.action, error: null });
  },
  onNew: () => {
    set({ action: 'NEW', currentData: {} });
  },
  onEdit: (payload) => {
    set({ action: 'EDIT', currentData: payload.data });
  },
  onConfDelete: (payload) => {
    set({ currentData: payload.data });
  },
  onCancelDelete: () => {
    set({ action: 'VIEW', currentData: {} });
  },
  onDelete: async () => {
    const { posts, onCancelDelete, currentData } = get();
    try {
      const { id } = await deletePost(currentData.id);
      console.log('id', typeof id, typeof posts);

      const newPosts = posts.filter((post) => post.id !== id);
      console.log('newPosts', newPosts);
      set({ posts: newPosts, error: null, action: 'VIEW' });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el post';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      throw message;
    }
  },
  filteredItems: () => {
    const { posts, filter } = get();

    return posts
      .filter(
        (post) =>
          ((post.title
            .toLowerCase()
            .includes(filter.filterText.toLowerCase()) ||
            post.slug.toLowerCase().includes(filter.filterText.toLowerCase()) ||
            (post.excerpt &&
              post.excerpt
                .toLowerCase()
                .includes(filter.filterText.toLowerCase())) ||
            post.content
              .toLowerCase()
              .includes(filter.filterText.toLowerCase())) &&
            filter.filterSection.length === 0) ||
          post.sections.includes(filter.filterSection)
      )
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  },
  onClearFilter: () => {
    const { resetPaginationToggle } = get();
    set({
      resetPaginationToggle: !resetPaginationToggle,
      filter: { filterSection: '', filterText: '' },
    });
  },
  onSetFilter: (payload) => {
    const { filter } = get();
    set({
      filter: { ...filter, [payload.field]: payload.value },
    });
  },

  onSubmit: async (e) => {
    const { action, posts, currentData } = get();
    const { data } = checkForm(e);
    if (!data) return;

    data.order = parseInt(data.order);

    console.log('Data', data, action);
    try {
      if (action === 'NEW') {
        const resp = await createPost(data);

        set({
          posts: [...posts, resp],
          error: null,
          action: 'VIEW',
          currentData: {},
        });
      } else {
        data.id = currentData.id;
        const updPost = await updatePost(data);

        const newPosts = posts.map((prod) =>
          prod.id === updPost.id ? updPost : prod
        );
        set({
          posts: newPosts,
          error: null,
          action: 'VIEW',
          currentData: {},
        });
      }
    } catch (error) {
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el producto`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      throw message;
    } finally {
      // loading.removeAttribute('loading');
    }
  },
}));
