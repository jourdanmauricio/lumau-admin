import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Office from './Office';
import DeleteOffice from './DeleteOffice';
import useOffices from './useOffices';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Offices = () => {
  const {
    offices,
    action,
    OFFICE_COLUMNS,
    theme,
    actionsMenu,
    currentData,
    onSubmit,
    onCancelDelete,
    isOpenModal,
    onDelete,
    ExpandedComponent,
  } = useOffices();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-offices"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && offices && (
          <DataTable
            // dense
            title="Oficinas"
            columns={OFFICE_COLUMNS}
            data={offices}
            theme={theme}
            actions={actionsMenu}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        )}
        {(action === 'NEW' || action === 'EDIT') && (
          <Office
            currentData={currentData}
            action={action}
            onSubmit={onSubmit}
            onCancelDelete={onCancelDelete}
          />
        )}
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            closeModal={onCancelDelete}
          >
            <DeleteOffice
              currentData={currentData}
              onDelete={onDelete}
              onCancelDelete={onCancelDelete}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Offices;
