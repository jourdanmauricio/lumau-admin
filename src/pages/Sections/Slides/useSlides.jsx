/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createSlide,
  deleteSlide,
  getSlides,
  updateSlide,
} from '@/services/api/slides.api';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '@/utils/checkForm';

const useSlides = () => {
  const [action, setAction] = useState('VIEW');
  const [slides, setSlides] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSlides(user);
        setSlides(data);
      } catch (error) {
        let message = 'Error obteniendo los slides';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-slides');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const SLIDE_COLUMNS = [
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
      // width: '120px',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Tipo',
      width: '90px',
      selector: (row) => row.type,
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
      const { id } = await deleteSlide(postId);
      const newPosts = slides.filter((post) => post.id !== parseInt(id));
      setSlides(newPosts);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Slide eliminado',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el slide';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-slide');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-slides');
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
        const resp = await createSlide(data);

        setSlides([...slides, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Slide creado!',
        });
      } else {
        data.id = currentData.id;
        const updSlide = await updateSlide(data);

        const newSlides = slides.map((slide) =>
          slide.id === updSlide.id ? updSlide : slide
        );
        setSlides(newSlides);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Slide modificado!',
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

      const formError = document.getElementById('form-error-slides');
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

  return {
    slides,
    SLIDE_COLUMNS,
    action,
    theme,
    actionsMenu,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
  };
};
export default useSlides;
