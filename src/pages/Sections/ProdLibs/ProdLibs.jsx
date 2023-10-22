/* eslint-disable react/prop-types */
import DataTable from 'react-data-table-component';
import '@/styles/dataTableThemes';
import useProdsLibs from './useProdsLibs';
import ProdLib from './ProdLib';
import { Modal } from '@/components/Modal/Modal';
import DeleteProdLib from './DeleteProdLib';
import { useProdLibsStore } from '@/store/prodLib';
import { useUserStore } from '@/store/user';
import Expanded from './Expanded';
import { paginationOptions } from '@/config/variables';
import Spinner from '@/components/Spinner/Spinner';
import { useNotification } from '@/components/Notifications/NotificationProvider';

const ProdLibs = () => {
  const theme = useUserStore((state) => state.theme);
  const { filteredItems, action, onFileUpload, toggledClearRows, loading } =
    useProdLibsStore();
  const dispatchNotif = useNotification();
  const {
    COLUMNS,
    actionsMenu,
    subHeaderComponentMemo,
    isOpenModal,
    handleRowSelected,
    contextActions,
    handleDelete,
    handleCancelDelete,
  } = useProdsLibs();

  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const resp = await onFileUpload(file);
      if (resp === 'cancel') return;

      dispatchNotif({
        type: 'SUCCESS',
        message: resp,
      });
    } catch {
      dispatchNotif({
        type: 'ERROR',
        message: 'Error imapactando archivo',
      });
    } finally {
      e.target.value = null;
    }
  };

  return (
    <div>
      {action === 'VIEW' && (
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleUpload}
        />
      )}
      <div className="relative">
        <lumau-message
          id="form-error-prod-lib"
          errorForm=""
        ></lumau-message>
      </div>
      {action === 'VIEW' && (
        <div className="py-12">
          <DataTable
            dense
            title="Productos Librería"
            columns={COLUMNS}
            data={filteredItems()}
            theme={theme}
            actions={actionsMenu}
            expandableRows
            expandableRowsComponent={Expanded}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            pagination
            paginationComponentOptions={paginationOptions}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggledClearRows}
            contextActions={contextActions}
          />
        </div>
      )}
      {(action === 'NEW' || action === 'EDIT') && (
        <ProdLib onCancelDelete={handleCancelDelete} />
      )}
      {loading && <Spinner />}
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={handleCancelDelete}
        >
          <DeleteProdLib
            handleCancelDelete={handleCancelDelete}
            handleDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
};
export default ProdLibs;
