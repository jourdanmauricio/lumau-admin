import Layout from '../../components/Layout/layout';
import DataTable from 'react-data-table-component';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';
import useLoans from './useLoans';
import '@/styles/dataTableThemes';
import NewEditLoan from './NewEditLoan';
import { Modal } from '../../components/Modal/Modal';
import DeleteLoan from './DeleteLoan';

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
    <Layout>
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
    </Layout>
  );
};
export default Loans;
