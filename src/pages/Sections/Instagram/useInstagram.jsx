/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
// import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  // createLesson,
  getInstagrams,
  // updateLesson,
} from '@/services/api/instagrams.api';
import checkForm from '@/utils/checkForm';
import { config } from '../../../config/config';

const useInstagram = () => {
  const [instagrams, setInstagrams] = useState([]);
  // const [currentData, setCurrentData] = useState({});
  const theme = useUserStore((state) => state.theme);
  // const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

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
      name: 'Título',
      selector: (row) => row.title.slice(0, 40),
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

  const onSubmit = async (e) => {
    const { data } = checkForm(e);
    console.log('DATA', data);
    if (!data) return;

    // try {
    //   if (action === 'NEW') {
    //     const resp = await createLesson(data);

    //     setLessons([...lessons, resp]);
    //     dispatchNotif({
    //       type: 'SUCCESS',
    //       message: 'Clase creada!',
    //     });
    //   } else {
    //     data.id = currentData.id;
    //     const updLesson = await updateLesson(data);

    //     const newLessons = lessons.map((post) =>
    //       post.id === updLesson.id ? updLesson : post
    //     );
    //     setLessons(newLessons);

    //     dispatchNotif({
    //       type: 'SUCCESS',
    //       message: 'Clase modificada!',
    //     });
    //   }
    //   setCurrentData({});
    //   onChangeAction('VIEW');
    // } catch (error) {
    //   console.log('error', error);
    //   let message = `Error ${
    //     action === 'NEW' ? 'creando' : 'modificando'
    //   } la clase`;
    //   if (error.response)
    //     message = `${error.response.status}: ${error.response.statusText}`;

    //   const formError = document.getElementById('form-error-lessons');
    //   formError.setAttribute('errorForm', message);
    // } finally {
    //   // loading.removeAttribute('loading');
    // }
  };

  return {
    instagrams,
    INSTAGRAM_COLUMNS,
    theme,
    actionsMenu,
    onSubmit,
  };
};
export default useInstagram;
