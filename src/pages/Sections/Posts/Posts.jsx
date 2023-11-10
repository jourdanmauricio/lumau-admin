import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Post from './Post';
import DeletePost from './DeletePost';
import usePosts from './usePosts';
import { usePostsStore } from '@/store/posts';
import Expanded from './Expanded';
import { useUserStore } from '@/store/user';
import Spinner from '@/components/Spinner/Spinner';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Posts = () => {
  const theme = useUserStore((state) => state.theme);
  const { filteredItems, action, loading } = usePostsStore();

  const {
    POST_COLUMNS,
    actionsMenu,
    subHeaderComponentMemo,
    isOpenModal,
    handleDelete,
    handleCancelDelete,
  } = usePosts();

  console.log('filteredItems', filteredItems());

  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-posts"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && (
          <DataTable
            // dense
            title="Posts"
            columns={POST_COLUMNS}
            data={filteredItems()}
            theme={theme}
            actions={actionsMenu}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            expandableRows
            expandableRowsComponent={Expanded}
            pagination
          />
        )}
        {(action === 'NEW' || action === 'EDIT') && (
          <Post onCancelDelete={handleCancelDelete} />
        )}
        {loading && <Spinner />}
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            closeModal={handleCancelDelete}
          >
            <DeletePost
              handleCancelDelete={handleCancelDelete}
              handleDelete={handleDelete}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Posts;
