/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useUserStore } from '@/store/user';
import { useModal } from '@/hooks/useModal';
import { deleteContact, getContacts } from '@/services/api/contacts.api';
import { FaRegTrashAlt } from 'react-icons/fa';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        let message = 'Error obteniendo contactos';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-contacts');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, []);

  const CONTACTS_COLUMNS = [
    {
      name: 'id',
      width: '10%',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      width: '20%',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      width: '30%',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Fecha creación',
      width: '20%',
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '10%',
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

  const ExpandedComponent = ({ data }) => (
    <div className="p-4">
      <p>Nombre: {data.name} </p>
      <p>Email: {data.email}</p>
      <p>Telefono: {data.phone}</p>
      <p>Mensaje: {data.comment}</p>
    </div>
    // <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const handleDelete = (row) => {
    setCurrentData(row);
    openModal();
  };

  const onDelete = async (userId) => {
    try {
      const { id } = await deleteContact(userId);
      const newContacts = contacts.filter((user) => user.id !== parseInt(id));
      setContacts(newContacts);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contacto eliminado',
      });
      closeModal();
    } catch (error) {
      let message = 'Error eliminando el contacto';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-contact');
      formError.setAttribute('errorForm', message);
    }
  };

  return {
    contacts,
    CONTACTS_COLUMNS,
    currentData,
    theme,
    onDelete,
    isOpenModal,
    ExpandedComponent,
  };
};
export default useContacts;
