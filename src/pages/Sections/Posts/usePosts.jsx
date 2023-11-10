/* eslint-disable react/prop-types */
import { useEffect, useMemo } from 'react';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import SubHeader from './SubHeader';
import { usePostsStore } from '@/store/posts';
import { config } from '@/config/config';
import { useUserStore } from '@/store/user';

const usePosts = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const dispatchNotif = useNotification();
  const user = useUserStore((state) => state.user);

  const {
    getAllPosts,
    onNew,
    onEdit,
    onCancelDelete,
    filter,
    onDelete,
    resetPaginationToggle,
    onConfDelete,
  } = usePostsStore();

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const POST_COLUMNS = [
    {
      name: 'Imagen',
      // selector: (row) => row.image,
      // sortable: true,
      width: '100px',
      cell: (row) => (
        <img
          src={row.image}
          alt={row.image_alt}
        />
      ),
    },
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Secciones',
      selector: (row) => row.sections.join(', '),
      sortable: true,
    },

    {
      name: 'Order',
      width: '90px',
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '15%',
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

  const handleAuthInstagram = () => {
    const clientId = config.clientFaceDev;
    const redirectUri = config.redirectUriFaceDev;

    window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=${user.id}`
      // '_blank',
      // 'noreferrer'
    );
  };

  const actionsMenu = useMemo(() => {
    return (
      <>
        <button
          type="button"
          className="btn-cancel text-base"
          onClick={handleAuthInstagram}
        >
          Importar Instagram
        </button>
        <div
          className="btn-icon"
          onClick={() => onNew()}
        >
          <FaPlus className="text-teal-500" />
        </div>
      </>
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
          message: 'Post eliminado',
        });
    } catch (error) {
      const formError = document.getElementById('form-error-delete-prod-lib');
      formError.setAttribute('errorForm', error);
    }
  };

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, resetPaginationToggle]
  );

  return {
    POST_COLUMNS,
    actionsMenu,
    subHeaderComponentMemo,
    isOpenModal,
    handleCancelDelete,
    handleDelete,
  };
};
export default usePosts;
