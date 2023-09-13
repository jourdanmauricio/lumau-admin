import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '../../store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from '../../services/api/services.api';
import { useModal } from '../../hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '../../utils/checkForm';

const useServices = () => {
  const [action, setAction] = useState('VIEW');
  const [services, setServices] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices(user);
        setServices(data);
      } catch (error) {
        let message = 'Error obteniendo los servicos';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-services');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const SERVICE_COLUMNS = [
    {
      name: 'Imagen',
      width: '100px',
      cell: (service) => (
        <img
          className="p-2"
          src={service.image}
          alt={service.image_alt}
        />
      ),
    },
    {
      name: 'Título',
      sortable: true,
      cell: (service) => (
        <div className="text-wrap">
          {service.title.replace(/(<([^>]+)>)/gi, '')}
        </div>
      ),
    },
    {
      name: 'Orden',
      width: '90px',
      center: true,
      sortable: true,
      selector: (service) => service.order,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (service) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(service)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => handleDelete(service)}
          >
            <FaRegTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
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

  const onDelete = async (serviceId) => {
    try {
      const { id } = await deleteService(serviceId);
      const newServices = services.filter(
        (service) => service.id !== parseInt(id)
      );
      setServices(newServices);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Servicio eliminado',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el servicio';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-service');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-services');
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
        const resp = await createService(data);

        setServices([...services, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Servicio creado!',
        });
      } else {
        data.id = currentData.id;
        const updService = await updateService(data);

        const newServices = services.map((service) =>
          service.id === updService.id ? updService : service
        );
        setServices(newServices);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Servicio modificado!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el servicio`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-services');
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
    services,
    SERVICE_COLUMNS,
    action,
    theme,
    actionsMenu,
    handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
  };
};
export default useServices;
