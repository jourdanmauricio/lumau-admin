import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '@/services/api/users.api';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { createUser, updateUser, deleteUser } from '@/services/api/users.api';
import checkForm from '@/utils/checkForm';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useModal } from '../../hooks/useModal';

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [action, setAction] = useState('VIEW');
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data);
      } catch (error) {
        let message = 'Error obteniendo usuarios';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-users');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, []);

  const USERS_COLUMNS = [
    {
      name: 'Web',
      selector: (row) => row.url,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Deploy',
      selector: (row) => row.deploy,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
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

  const actionsMenu = useMemo(() => {
    return (
      <div
        className="btn-icon"
        onClick={() => setAction('NEW')}
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

  const onDelete = async (userId) => {
    try {
      const { id } = await deleteUser(userId);
      const newUsers = users.filter((user) => user.id !== parseInt(id));
      setUsers(newUsers);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Usuario eliminado',
      });
      closeModal();
      onChangeAction('VIEW');
    } catch (error) {
      let message = 'Error eliminando el usuario';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-users');
      formError.setAttribute('errorForm', message);
    }
  };

  const onEdit = (row) => {
    setCurrentData(row);
    setAction('EDIT');
  };

  const onSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    try {
      if (action === 'NEW') {
        const resp = await createUser(data);

        setUsers([...users, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Usuario creado!',
        });
      } else {
        data.id = currentData.id;
        const resp = await updateUser(data);

        const newUsers = users.map((note) =>
          note.id === resp.id ? resp : note
        );
        setUsers(newUsers);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Usuario modificado!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el usuario`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-users');
      formError.setAttribute('errorForm', message);
    } finally {
      // loading.removeAttribute('loading');
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-users');
    formError.removeAttribute('errorForm');
  };

  const onCancelDelete = () => {
    setCurrentData({});
    closeModal();
    onChangeAction('VIEW');
  };

  return {
    users,
    USERS_COLUMNS,
    theme,
    actionsMenu,
    action,
    currentData,
    onSubmit,
    onChangeAction,
    onCancelDelete,
    onDelete,
    isOpenModal,
  };
};
export default useUsers;
