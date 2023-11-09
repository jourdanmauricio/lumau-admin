/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createLesson,
  deleteLesson,
  getLessons,
  updateLesson,
} from '@/services/api/lessons.api';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '@/utils/checkForm';

const useLessons = () => {
  const [action, setAction] = useState('VIEW');
  const [lessons, setLessons] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLessons(user);
        setLessons(data);
      } catch (error) {
        let message = 'Error obteniendo las clases';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-lessons');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const LESSON_COLUMNS = [
    {
      name: 'Tipo',
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: 'Días',
      selector: (row) => row.days,
      sortable: true,
    },
    {
      name: 'Horarios',
      selector: (row) => row.hours,
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

  const onDelete = async (lessonId) => {
    try {
      const { id } = await deleteLesson(lessonId);
      const newLessons = lessons.filter((lesson) => lesson.id !== parseInt(id));
      setLessons(newLessons);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Clase eliminada',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando la clase';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-lesson');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-lessons');
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
        const resp = await createLesson(data);

        setLessons([...lessons, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Clase creada!',
        });
      } else {
        data.id = currentData.id;
        const updLesson = await updateLesson(data);

        const newLessons = lessons.map((post) =>
          post.id === updLesson.id ? updLesson : post
        );
        setLessons(newLessons);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Clase modificada!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      console.log('error', error);
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } la clase`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-lessons');
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
    lessons,
    LESSON_COLUMNS,
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
export default useLessons;
