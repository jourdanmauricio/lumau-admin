/* eslint-disable react/prop-types */
import { useEffect, useMemo, useCallback } from 'react';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { status as statusProd } from '@/config/variables';
import { useProdLibsStore } from '@/store/prodLib';
import SubHeader from './SubHeader';
import SelectActions from './SelectActions';

const useProdsLibs = () => {
  const {
    getAllProdLibs,
    prodLibs,
    onNew,
    onEdit,
    onCancelDelete,
    filter,
    onDelete,
    resetPaginationToggle,
    onConfDelete,
    getCategories,
    setSeletedRows,
    selectedRows,
  } = useProdLibsStore();
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);

  useEffect(() => {
    getAllProdLibs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const COLUMNS = [
    {
      name: 'Artículo',
      width: '100px',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Imagen',
      width: '100px',
      cell: (row) => (
        <img
          src={row.image}
          alt={row.image_alt}
        />
      ),
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Categoría',
      width: '120px',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Categoría Web',
      width: '130px',
      selector: (row) => row.categoryWeb,
      sortable: true,
    },
    {
      name: 'Estado',
      width: '90px',
      selector: (row) => (
        <>
          <span>{statusProd.find((el) => el.id === row.status)?.value}</span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Price',
      width: '90px',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '100px',
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <div
            onClick={() => {
              onConfDelete({ data: row });
              openModal();
            }}
            className="btn-icon"
          >
            <FaRegTrashAlt className="text-red-500 text-lg" />
          </div>
          <div
            onClick={() => onEdit({ data: row })}
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

  const handleCancelDelete = () => {
    onCancelDelete();
    closeModal();
  };

  const handleDelete = async () => {
    try {
      const resp = onDelete();
      closeModal();
      if (resp)
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Producto eliminado',
        });
    } catch (error) {
      const formError = document.getElementById('form-error-delete-prod-lib');
      formError.setAttribute('errorForm', error);
    }
  };

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, resetPaginationToggle, getCategories, status]
  );

  const handleRowSelected = useCallback(
    (state) => {
      console.log('select', state.selectedRows);
      setSeletedRows({ rows: state.selectedRows });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const contextActions = useMemo(
    () => <SelectActions />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prodLibs, selectedRows]
  );

  return {
    COLUMNS,
    actionsMenu,
    subHeaderComponentMemo,
    isOpenModal,
    contextActions,
    handleCancelDelete,
    handleDelete,
    handleRowSelected,
  };
};
export default useProdsLibs;
