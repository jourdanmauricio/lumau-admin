import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Office from './Post';
import DeleteOffice from './DeletePost';
import usePosts from './usePosts';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Offices = () => {
  const {
    posts,
    POST_COLUMNS,
    action,
    theme,
    actionsMenu,
    // handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
    ExpandedComponent,
  } = usePosts();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-posts"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && posts && (
          <DataTable
            // dense
            title="Posts"
            columns={POST_COLUMNS}
            data={posts}
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
