import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import DeleteOrder from './DeleteOrder';
import useOrders from './useOrders';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Orders = () => {
  const {
    orders,
    action,
    ORDER_COLUMNS,
    theme,
    actionsMenu,
    currentData,
    onCancelDelete,
    isOpenModal,
    onDelete,
    ExpandedComponent,
  } = useOrders();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-orders"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && orders && (
          <DataTable
            // dense
            title="Oficinas"
            columns={ORDER_COLUMNS}
            data={orders}
            theme={theme}
            actions={actionsMenu}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        )}

        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            closeModal={onCancelDelete}
          >
            <DeleteOrder
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
export default Orders;
