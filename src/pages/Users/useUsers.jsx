/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '@/services/api/users.api';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { createUser, updateUser, deleteUser } from '@/services/api/users.api';
import checkForm from '@/utils/checkForm';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useModal } from '../../hooks/useModal';
import { menuItems } from '@/utils/menuItems';

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [action, setAction] = useState('VIEW');
  const [currentData, setCurrentData] = useState({ attributes: [] });
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
      name: 'Username',
      selector: (row) => row.username,
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

  const onNew = () => {
    setCurrentData({ attributes: [] });
    setAction('NEW');
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
        const updUser = await updateUser(data);

        // updUser.attributes.map(async (attrib) => {
        //   const feature = menuItems.find(
        //     (item) => item.name === attrib && item.feature === true
        //   );
        //   if (feature) {
        //     console.log('feature', feature);
        //     const obj = {
        //       name: feature.name,
        //       value: [],
        //       userId: currentData.id,
        //       description: feature.description,
        //     };
        //     const resp = await createFeature(obj);
        //     console.log('RESP feature', resp);
        //   }
        // });

        const newUsers = users.map((user) =>
          user.id === updUser.id ? updUser : user
        );
        setUsers(newUsers);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Usuario modificado!',
        });
      }
      setCurrentData({ attributes: [] });
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
    setCurrentData({ attributes: [] });
    closeModal();
    onChangeAction('VIEW');
  };

  const ExpandedComponent = ({ data }) => (
    <div className="p-4">
      <div className="flex gap-8">
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>User: {data.username}</p>
          <p>Nombre: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Web: {data.url}</p>
          <p>Teléfono:{data.phone}</p>
          <p>DNI: {data.dni}</p>
          <p>Deploy: {data.deploy}</p>
          <p>Role:{data.role}</p>
          <p>Atributos: {data.attributes}</p>
        </div>
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Name: {data.cloudName}</p>
          <p>Folder: {data.cloudFolder}</p>
          <p>Api Key: {data.cloudApiKey}</p>
          <p>Preset: {data.cloudPreset}</p>
        </div>
      </div>
    </div>
    // <pre>{JSON.stringify(data, null, 2)}</pre>
  );

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
    menuItems,
    ExpandedComponent,
  };
};
export default useUsers;
