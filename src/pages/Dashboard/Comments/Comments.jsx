import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Message from '@/commons/Message/Message';
import Spinner from '@/commons/Spinner/Spinner';
import ContactDeleteForm from './components/ContactDeleteForm';
import ContactTable from './components/ContactTable';
import { getComments, deleteComment } from '@/services/api/comments.api';

const Comments = () => {
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getComments();

      if (data.statusCode) {
        throw data;
      }
      setContact(data);
    } catch (err) {
      setError(`${err.statusCode}: ${err.error} - ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const deleteData = (data) => {
    setDataToDelete(data);
    openModal();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const resData = await deleteComment(id);

      let newData = contact.filter((el) => el.id !== id);
      setContact(newData);
      closeModal();
      setDataToDelete(null);
      dispatch({
        type: 'SUCCESS',
        message: 'Mensaje eliminado!',
      });
    } catch (err) {
      setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      dispatch({
        type: 'ERROR',
        message: 'Error eliminando el mensaje',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDataToDelete(null);
    closeModal();
  };
  return (
    <>
      <h2 className="title">Contactos</h2>
      {error && <Message msg={error} closeMessage={() => setError(null)} />}
      {loading && <Spinner />}
      <br />
      <ContactTable deleteData={deleteData} contact={contact} />

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <ContactDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </>
  );
};

export default Comments;
