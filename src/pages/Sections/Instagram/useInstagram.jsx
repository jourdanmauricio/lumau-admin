/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { config } from '@/config/config';
import {
  deletePost,
  updatePost,
  getInstagrams,
} from '@/services/api/instagrams.api';

const useInstagram = () => {
  const [instagrams, setInstagrams] = useState([]);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);
  const [currentRow, setCurrentRow] = useState(null);

  console.log('Instagrams USE', currentRow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInstagrams(user);
        setInstagrams(data);
      } catch (error) {
        let message = 'Error obteniendo las publicaciones';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-instagrams');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const INSTAGRAM_COLUMNS = [
    {
      name: 'Imagen',
      width: '100px',
      cell: (row) => (
        <img
          src={row.image}
          alt={row.image_alt}
        />
      ),
    },
    {
      name: 'Descripción',
      selector: (row) => row.content.slice(0, 40),
      sortable: true,
    },
    {
      name: 'Show',
      selector: (row) => (row.sections.includes('instagram') ? 'Si' : 'No'),
      sortable: true,
    },
    {
      name: 'Order',
      width: '90px',
      selector: (row) => row.order,
      sortable: true,
    },
  ];

  const handleAuthInstagram = () => {
    const clientId = config.clientFaceDev;
    const redirectUri = config.redirectUriFaceDev;

    window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=${user.id}`,
      '_blank',
      'noreferrer'
    );
  };

  const actionsMenu = useMemo(() => {
    return (
      <button
        className="btn-confirm m-4 text-base"
        onClick={handleAuthInstagram}
      >
        Importar desde Instagram
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (post, action) => {
    if (action === 'EDIT') {
      const updPost = await updatePost(post);
      const newPosts = instagrams.map((post) =>
        post.id === updPost.id ? updPost : post
      );
      setInstagrams(newPosts);
      setCurrentRow({});

      dispatchNotif({
        type: 'SUCCESS',
        message: 'Publicación modificada!',
      });
    }
    if (action === 'DELETE') {
      // const resp = await updatePost(obj);
      console.log('DELETE', post);
      const { id } = await deletePost(post.id);
      console.log('delPost', id);
      const newPosts = instagrams.filter((post) => post.id !== parseInt(id));
      setInstagrams(newPosts);
      setCurrentRow({});

      dispatchNotif({
        type: 'SUCCESS',
        message: 'Publicación eliminada!',
      });
    }
  };

  return {
    instagrams,
    INSTAGRAM_COLUMNS,
    theme,
    actionsMenu,
    handleSubmit,
    currentRow,
    setCurrentRow,
  };
};
export default useInstagram;
