/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createOffice,
  deleteOffice,
  getOffices,
  updateOffice,
} from '@/services/api/offices.api';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '@/utils/checkForm';

const useOffices = () => {
  const [action, setAction] = useState('VIEW');
  const [offices, setOffices] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOffices(user);
        setOffices(data);
      } catch (error) {
        let message = 'Error obteniendo las oficinas';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-offices');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const OFFICE_COLUMNS = [
    {
      name: 'Ciudad',
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: 'Dirección',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Order',
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

  const onDelete = async (officeId) => {
    try {
      const { id } = await deleteOffice(officeId);
      const newOffices = offices.filter((office) => office.id !== parseInt(id));
      setOffices(newOffices);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Oficina eliminada',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando la oficina';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-office');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-offices');
    formError.removeAttribute('errorForm');
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
        const resp = await createOffice(data);

        setOffices([...offices, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Oficina creada!',
        });
      } else {
        data.id = currentData.id;
        const updOffice = await updateOffice(data);

        const newOffices = offices.map((office) =>
          office.id === updOffice.id ? updOffice : office
        );
        setOffices(newOffices);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Oficina modificada!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      console.log('error', error);
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } la oficina`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-offices');
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
          <p>Ciudad: {data.city}</p>
          <p>Dirección: {data.address}</p>
          <p>Provincia: {data.province}</p>
          <p>Teléfono:{data.phone}</p>
          <p>Email: {data.email}</p>
        </div>
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Latitud:{data.lat}</p>
          <p>Longitud:{data.lng}</p>
          <p>Orden: {data.order}</p>
        </div>
      </div>
    </div>
    // <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  return {
    offices,
    OFFICE_COLUMNS,
    action,
    theme,
    actionsMenu,
    handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
    ExpandedComponent,
  };
};
export default useOffices;
