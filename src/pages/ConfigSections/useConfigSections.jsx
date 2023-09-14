import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useUserStore } from '@/store/user';
import { useSectionsStore } from '@/store/sections';
import { useModal } from '@/hooks/useModal';

const useConfigSections = () => {
  const theme = useUserStore((state) => state.theme);
  const { sections, error, setCurrentData } = useSectionsStore();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const navigate = useNavigate();

  const handleDelete = (data) => {
    setCurrentData({ payload: { data, action: 'DELETE' } });
    openModal();
  };

  const onCancelDelete = () => {
    setCurrentData({
      payload: { data: { roles: 'admin, user' }, action: 'VIEW' },
    });
    closeModal();
  };

  const handleEdit = (data) => {
    setCurrentData({ payload: { data, action: 'EDIT' } });
    navigate(`/config-sections/${data.id}`);
  };
  const handleNew = () => {
    setCurrentData({
      payload: { data: { roles: 'admin, user' }, action: 'NEW' },
    });
    navigate('/config-sections/new');
  };

  const SECTIONS_COLUMNS = [
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Atributo',
      selector: (row) => row.resource,
      sortable: true,
    },
    {
      name: 'path',
      selector: (row) => row.route,
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
          <div
            onClick={() => handleEdit(row)}
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
      <button onClick={handleNew}>
        <FaPlus className="text-teal-500" />
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    sections,
    SECTIONS_COLUMNS,
    actionsMenu,
    theme,
    onCancelDelete,
    isOpenModal,
    error,
  };
};
export default useConfigSections;
