/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  getOrders,
  deleteOrder,
  createOrder,
  updateOrder,
} from '@/services/api/orders.api';
import { useModal } from '@/hooks/useModal';
import { FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '@/utils/checkForm';

const useOrders = () => {
  const [action, setAction] = useState('VIEW');
  const [orders, setOrders] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders(user);
        setOrders(data);
      } catch (error) {
        let message = 'Error obteniendo los pedidos';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-orders');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const ORDER_COLUMNS = [
    {
      name: 'Pedido',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Monto',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Envío',
      selector: (row) => row.delivery,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '15%',
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <div
            onClick={() => handleDelete(row)}
            className="btn-icon"
          >
            <FaRegTrashAlt className="text-red-500 text-lg" />
          </div>
          {/* <div
            onClick={() => onEdit(row)}
            className="btn-icon"
          >
            <FaEdit className="text-blue-500 text-lg" />
          </div> */}
        </div>
      ),
    },
  ];

  // const onNew = () => {
  //   setAction('NEW');
  //   setCurrentData({});
  // };

  // const actionsMenu = useMemo(() => {
  //   return (
  //     <div
  //       className="btn-icon"
  //       onClick={() => onNew()}
  //     >
  //       <FaPlus className="text-teal-500" />
  //     </div>
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleDelete = (row) => {
    setCurrentData(row);
    openModal();
  };

  const onDelete = async (orderId) => {
    try {
      const { id } = await deleteOrder(orderId);
      const newOrders = orders.filter((order) => order.id !== parseInt(id));
      setOrders(newOrders);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Oficina eliminada',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el pedido';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-order');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-orders');
    formError.removeAttribute('errorForm');
  };

  // const onEdit = (row) => {
  //   setCurrentData(row);
  //   setAction('EDIT');
  // };

  const onSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    try {
      if (action === 'NEW') {
        const resp = await createOrder(data);

        setOrders([...orders, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Oficina creada!',
        });
      } else {
        data.id = currentData.id;
        const updOffice = await updateOrder(data);

        const newOrders = orders.map((office) =>
          office.id === updOffice.id ? updOffice : office
        );
        setOrders(newOrders);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Pedido modificado!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      console.log('error', error);
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el pedido`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-orders');
      formError.setAttribute('errorForm', message);
    } finally {
      // loading.removeAttribute('loading');
    }
  };

  const onCancelDelete = () => {
    setCurrentData({});
    closeModal();
    onChangeAction('VIEW');
  };

  const ExpandedComponent = ({ data }) => (
    <div className="p-4">
      <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
        {data.items.map((item) => (
          <div
            className="border"
            key={item.id}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20">
                <img
                  className="w-full h-full"
                  src={item.image}
                  alt={item.altImage}
                />
              </div>

              <div>
                <p>Id: {item.id}</p>
                <p>Prod: {item.name}</p>
                <p>
                  Precio: $ {item.price} Cantidad: {item.quantity} u
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-2 border">
          <p>{data.buyer[0].name}</p>
          <p>{data.buyer[0].phone}</p>
          <p>{data.buyer[0].email}</p>
          <p>{data.buyer[0].dni}</p>
        </div>
        <div className="w-full md:w-1/2 p-2 border">
          {data.deliveryInfo[0] ? (
            <>
              <p>{data.deliveryInfo[0].state}</p>
              <p>{data.deliveryInfo[0].city}</p>
              <p>{data.deliveryInfo[0].address}</p>
            </>
          ) : (
            <p>Pedido sin envío</p>
          )}
        </div>
        {/* {data.frliveryInfo[0].address} */}
      </div>
    </div>
  );

  return {
    orders,
    ORDER_COLUMNS,
    action,
    theme,
    handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
    ExpandedComponent,
  };
};
export default useOrders;
