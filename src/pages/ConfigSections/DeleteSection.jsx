import { useSectionsStore } from '@/store/sections';
import { useNotification } from '@/components/Notifications/NotificationProvider';

/* eslint-disable react/prop-types */
const DeleteSection = ({ onCancelDelete }) => {
  const { handleDeleteSection, error, currentData } = useSectionsStore();
  const dispatchNotif = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleDeleteSection(currentData.id);
    if (error) return;
    dispatchNotif({ type: 'SUCCESS', message: 'Sección Eliminada' });
    onCancelDelete();
  };

  return (
    <>
      <h2 className="title-modal">Eliminar usuario</h2>
      <hr className="mt-1" />

      <div className="relative">
        <lumau-message
          id="form-delete-section"
          errorForm={error}
        ></lumau-message>
      </div>
      <div>
        <form
          className="p-10 bg-text-color flex justify-center items-center flex-col"
          onSubmit={handleSubmit}
        >
          <p className="text-center font-medium text-base my-5">
            Esta seguro de eliminar el usuario {currentData.id}?
          </p>
          <div className="mt-4 flex justify-between items-center w-full">
            <button
              className="btn-cancel"
              onClick={onCancelDelete}
              id="cancel"
              type="button"
            >
              Cancelar
            </button>

            <button
              className="btn-confirm"
              id="delete"
              type="submit"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default DeleteSection;
