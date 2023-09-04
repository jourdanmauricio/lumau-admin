import { useEffect, useState } from 'react';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import {
  deleteSubscriber,
  getSubscribers,
} from '@/services/api/subscribers.api';
import { FaRegTrashAlt } from 'react-icons/fa';

const useSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const dispatchNotif = useNotification();

  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscribers();
        setSubscribers(data);
      } catch (error) {
        let message = 'Error obteniendo suscriptores';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-subscribers');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, []);

  const SUBSCRIBERS_COLUMNS = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Fecha creación',
      selector: (row) => row.createdAt,
      // sortable: true,
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
        </div>
      ),
    },
  ];

  const handleDelete = (row) => {
    setCurrentData(row);
    openModal();
  };

  const onDelete = async (userId) => {
    try {
      const { id } = await deleteSubscriber(userId);
      const newSubscribers = subscribers.filter(
        (user) => user.id !== parseInt(id)
      );
      setSubscribers(newSubscribers);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Usuario eliminado',
      });
      closeModal();
    } catch (error) {
      let message = 'Error eliminando el usuario';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-subscriber');
      formError.setAttribute('errorForm', message);
    }
  };

  return {
    subscribers,
    SUBSCRIBERS_COLUMNS,
    currentData,
    // action,
    // onSubmit,
    // onChangeAction,
    // onCancelDelete,
    onDelete,
    isOpenModal,
  };
};
export default useSubscribers;
