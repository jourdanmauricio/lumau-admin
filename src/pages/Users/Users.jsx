import Layout from '@/components/Layout/layout';
import useUsers from './useUsers';
import NewEditUser from './NewEditUser';
import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import DeleteUser from './DeleteUser';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Users = () => {
  const {
    users,
    USERS_COLUMNS,
    theme,
    actionsMenu,
    action,
    currentData,
    onSubmit,
    onCancelDelete,
    onDelete,
    isOpenModal,
  } = useUsers();

  return (
    <div>
      <Layout>
        <div className="relative">
          <lumau-message
            id="form-error-users"
            errorForm=""
          ></lumau-message>
        </div>
        <div>
          {action === 'VIEW' && users && (
            <DataTable
              dense
              // selectableRows
              title="Usuarios"
              columns={USERS_COLUMNS}
              data={users}
              theme={theme}
              actions={actionsMenu}
              pagination
            />
          )}
          {(action === 'NEW' || action === 'EDIT') && (
            <NewEditUser
              editData={currentData}
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
              <DeleteUser
                currentData={currentData}
                onDelete={onDelete}
                onCancelDelete={onCancelDelete}
              />
            </Modal>
          )}
        </div>
      </Layout>
    </div>
  );
};
export default Users;
