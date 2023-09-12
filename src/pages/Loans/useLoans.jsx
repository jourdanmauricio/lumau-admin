import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '../../store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import {
  createLoan,
  deleteLoan,
  getLoans,
  updateLoan,
} from '../../services/api/loans.api';
import { useModal } from '../../hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import checkForm from '../../utils/checkForm';

const useLoans = () => {
  const [action, setAction] = useState('VIEW');
  const [loans, setLoans] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const theme = useUserStore((state) => state.theme);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoans(user);
        setLoans(data);
      } catch (error) {
        let message = 'Error obteniendo tipo de préstamos';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-users');
        formError.setAttribute('errorForm', message);
      }
    };
    fetchData();
  }, [user]);

  const LOAN_COLUMNS = [
    {
      name: 'Tipo',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Max cuotas',
      selector: (row) => row.maxQuantityQuotes,
      sortable: true,
    },
    {
      name: 'Monto max',
      selector: (row) => row.maxAmount,
      sortable: true,
    },
    {
      name: 'Tasa %',
      selector: (row) => row.rate,
      // sortable: true,
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
          <div
            onClick={() => onEdit(row)}
            className="btn-icon"
          >
            <FaEdit className="text-blue-500 text-lg" />
          </div>
        </div>
      ),
    },
  ];

  const actionsMenu = useMemo(() => {
    return (
      <div
        className="btn-icon"
        onClick={() => onNew()}
      >
        <FaPlus className="text-teal-500" />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (row) => {
    setCurrentData(row);
    openModal();
  };

  const onNew = () => {
    setAction('NEW');
    setCurrentData({});
  };

  const onDelete = async (loanId) => {
    try {
      const { id } = await deleteLoan(loanId);
      const newLoans = loans.filter((loan) => loan.id !== parseInt(id));
      setLoans(newLoans);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Tipo de préstamo eliminado',
      });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el usuario';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-delete-users');
      formError.setAttribute('errorForm', message);
    }
  };

  const onChangeAction = (action) => {
    setAction(action);
    const formError = document.getElementById('form-error-loans');
    formError.removeAttribute('errorForm');
  };

  const onEdit = (row) => {
    setCurrentData(row);
    setAction('EDIT');
  };

  const onSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    data.maxAmount = parseFloat(data.maxAmount);
    data.maxQuantityQuotes = parseInt(data.maxQuantityQuotes);
    data.rate = parseFloat(data.rate);

    try {
      if (action === 'NEW') {
        const resp = await createLoan(data);

        setLoans([...loans, resp]);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Préstamo creado!',
        });
      } else {
        data.id = currentData.id;
        const updUser = await updateLoan(data);

        const newUsers = loans.map((user) =>
          user.id === updUser.id ? updUser : user
        );
        setLoans(newUsers);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Préstamo modificado!',
        });
      }
      setCurrentData({});
      onChangeAction('VIEW');
    } catch (error) {
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el préstamo`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-loans');
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

  return {
    loans,
    LOAN_COLUMNS,
    action,
    theme,
    actionsMenu,
    handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
  };
};
export default useLoans;
