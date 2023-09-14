import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import NewEditLoan from './NewEditLoan';
import DeleteLoan from './DeleteLoan';
import useLoans from './useLoans';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Loans = () => {
  const {
    loans,
    action,
    LOAN_COLUMNS,
    theme,
    actionsMenu,
    currentData,
    onSubmit,
    onCancelDelete,
    isOpenModal,
    onDelete,
  } = useLoans();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-loans"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && loans && (
          <DataTable
            // dense
            title="Préstamos"
            columns={LOAN_COLUMNS}
            data={loans}
            theme={theme}
            actions={actionsMenu}
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
export default Loans;
