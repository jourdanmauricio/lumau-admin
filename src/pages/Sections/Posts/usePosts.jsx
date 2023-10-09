/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '@/services/api/posts.api';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '@/utils/checkForm';

const usePosts = () => {
  const [action, setAction] = useState('VIEW');
  const [posts, setPosts] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(user);
        setPosts(data);
      } catch (error) {
        let message = 'Error obteniendo los posts';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-posts');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const POST_COLUMNS = [
    {
      name: 'Imagen',
      // selector: (row) => row.image,
      // sortable: true,
      width: '100px',
      cell: (row) => (
        <img
          src={row.image}
          alt={row.image_alt}
        />
      ),
    },
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Order',
      width: '90px',
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '15%',
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          {/* <a
            href={row.slug}
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
          >
            <FaEye className="text-teal-500 text-lg" />
          </a> */}

          <div
            onClick={() => handleDelete(row)}
            className="btn-icon"
          >
            <FaRegTrashAlt className="text-red-500 text-lg" />
          </div>
          <div
            onClick={() => onEdit(row)}
            className="btn-icon"
          >
            <FaEdit className="text-blue-500 text-lg" />
          </div>
        </div>
      ),
    },
  ];

  const onNew = () => {
    setAction('NEW');
    setCurrentData({});
  };

  const actionsMenu = useMemo(() => {
    return (
      <div
        className="btn-icon"
        onClick={() => onNew()}
      >
        <FaPlus className="text-teal-500" />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (row) => {
    setCurrentData(row);
    openModal();
  };

  const onDelete = async (postId) => {
    try {
      const { id } = await deletePost(postId);
      const newPosts = posts.filter((post) => post.id !== parseInt(id));
      setPosts(newPosts);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Post eliminado',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el post';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-post');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-posts');
    formError.removeAttribute('errorForm');
  };

  const onEdit = (row) => {
    setCurrentData(row);
    setAction('EDIT');
  };

  const onSubmit = async (e) => {
    const { data } = checkForm(e);
    console.log('DATA', data);
    if (!data) return;

    try {
      if (action === 'NEW') {
        const resp = await createPost(data);

        setPosts([...posts, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Post creado!',
        });
      } else {
        data.id = currentData.id;
        const updPost = await updatePost(data);

        const newPosts = posts.map((post) =>
          post.id === updPost.id ? updPost : post
        );
        setPosts(newPosts);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Post modificado!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      console.log('error', error);
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el post`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-posts');
      formError.setAttribute('errorForm', message);
    } finally {
      // loading.removeAttribute('loading');
    }
  };

  const onCancelDelete = () => {
    setCurrentData({});
    closeModal();
    onChangeAction('VIEW');
  };

  const ExpandedComponent = ({ data }) => (
    <div className="p-4">
      <div className="flex gap-8">
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Título: {data.title}</p>
          <p>Slug: {data.slug}</p>
          <p>Resumen: {data.excerpt}</p>
          <p>Alt Imagen:{data.altImage}</p>
        </div>
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Secciones:{data.sections}</p>
          <p>Tipo: {data.type}</p>
          <p>Orden: {data.order}</p>
        </div>
      </div>
      <div className="ql-snow">
        <div
          className="p-4 mt-4 ql-editor"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></div>
      </div>
    </div>
  );

  return {
    posts,
    POST_COLUMNS,
    action,
    theme,
    actionsMenu,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
    ExpandedComponent,
  };
};
export default usePosts;
