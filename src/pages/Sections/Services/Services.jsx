import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import NewEditLoan from './NewEditService';
import DeleteLoan from './DeleteService';
import useServices from './useServices';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Services = () => {
  const {
    services,
    action,
    SERVICE_COLUMNS,
    theme,
    actionsMenu,
    currentData,
    onSubmit,
    onCancelDelete,
    isOpenModal,
    onDelete,
    ExpandedComponent,
  } = useServices();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-services"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && services && (
          <DataTable
            // dense
            title="Servicios"
            columns={SERVICE_COLUMNS}
            data={services}
            theme={theme}
            actions={actionsMenu}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        )}
        {(action === 'NEW' || action === 'EDIT') && (
          <NewEditLoan
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
            <DeleteLoan
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
export default Services;
