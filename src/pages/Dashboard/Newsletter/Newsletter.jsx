import { useState } from 'react';
import { useEffect } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Message from '@/commons/Message/Message';
import Spinner from '@/commons/Spinner/Spinner';
import NewsletterDeleteForm from './components/NewsletterDeleteForm';
import NewsletterTable from './components/NewsletterTable';
import { getSubscribers } from '@/services/api/newsletter.api';
import { deleteSubscriber } from '../../../services/api/newsletter.api';

const Newsletter = () => {
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getSubscribers();

      if (data.statusCode) {
        throw data;
      }
      setData(data);
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
      const resData = await deleteSubscriber(id);
      let newData = data.filter((el) => el.id !== id);
      setData(newData);
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
      {error && <Message msg={error} closeMessage={() => setError(null)} />}
      {loading && <Spinner />}
      <br />
      <NewsletterTable deleteData={deleteData} data={data} />

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <NewsletterDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </>
  );
};

export default Newsletter;
