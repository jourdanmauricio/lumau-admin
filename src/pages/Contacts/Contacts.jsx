import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Layout from '@/components/Layout/layout';
import DeleteContact from './DeleteContact';
import useContacts from './useContacts';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Subscribers = () => {
  const {
    contacts,
    CONTACTS_COLUMNS,
    theme,
    onDelete,
    isOpenModal,
    onCancelDelete,
    currentData,
    ExpandedComponent,
  } = useContacts();
  return (
    <Layout>
      <div className="relative">
        <lumau-message
          id="form-error-subscribers"
          errorForm=""
        ></lumau-message>
      </div>
      <div>
        {contacts && (
          <DataTable
            // dense
            title="Contactos"
            columns={CONTACTS_COLUMNS}
            data={contacts}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
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
          <DeleteContact
            currentData={currentData}
            onDelete={onDelete}
            onCancelDelete={onCancelDelete}
          />
        </Modal>
      )}
    </Layout>
  );
};
export default Subscribers;
