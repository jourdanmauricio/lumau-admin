import DataTable from 'react-data-table-component';
import useSubscribers from './useSubscribers';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';
import { Modal } from '@/components/Modal/Modal';
import DeleteSubscriber from './DeleteSubscriber';

const Subscribers = () => {
  const {
    subscribers,
    SUBSCRIBERS_COLUMNS,
    theme,
    onDelete,
    isOpenModal,
    onCancelDelete,
    currentData,
  } = useSubscribers();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-subscribers"
          errorForm=""
        ></lumau-message>
      </div>
      <div>
        {subscribers && (
          <DataTable
            //dense
            title="Suscriptores"
            columns={SUBSCRIBERS_COLUMNS}
            data={subscribers}
            theme={theme}
            pagination
          />
        )}
      </div>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={onCancelDelete}
        >
          <DeleteSubscriber
            currentData={currentData}
            onDelete={onDelete}
            onCancelDelete={onCancelDelete}
          />
        </Modal>
      )}
    </>
  );
};
export default Subscribers;
