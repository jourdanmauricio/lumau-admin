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
    isOpenModalPass,
    openModalPass,
    closeModalPass,
    menuItems,
  } = useUsers();

  return (
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
            currentData={currentData}
            action={action}
            onSubmit={onSubmit}
            onCancelDelete={onCancelDelete}
            isOpenModalPass={isOpenModalPass}
            openModalPass={openModalPass}
            closeModalPass={closeModalPass}
            menuItems={menuItems}
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
  );
};
export default Users;