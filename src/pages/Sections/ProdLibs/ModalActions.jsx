import { useProdLibsStore } from '@/store/prodLib';
import { actions } from '@/config/variables';
import DeleteProds from './Massive/DeleteProds';
import ChangeStatus from './Massive/ChangeStatus';
import Spinner from '@/components/Spinner/Spinner';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import ChangePrice from './Massive/ChangePrice';

/* eslint-disable react/prop-types */
const ModalActions = ({ handleCancelDelete }) => {
  const {
    selectedRows,
    massiveAction,
    onSubmitMassive,
    loading,
    generateReport,
    setGenerateReport,
  } = useProdLibsStore();
  const dispatchNotif = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await onSubmitMassive();
      dispatchNotif({
        type: 'SUCCESS',
        message: resp,
      });
      handleCancelDelete();
    } catch (error) {
      const formError = document.getElementById(
        'form-error-delete-massive-post-lib'
      );
      formError.setAttribute('errorForm', error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <h2 className="title-modal">Acciones masivas</h2>
      <hr className="mt-1" />
      <div className="relative">
        <lumau-message
          id="form-error-delete-massive-post-lib"
          errorForm=""
        ></lumau-message>
      </div>
      <div>
        <form
          className="p-10 bg-text-color flex items-center flex-col"
          onSubmit={handleSubmit}
        >
          <div className="text-base my-5 border p-5 rounded">
            <p>
              Acción: {actions.find((el) => el.id === massiveAction)?.value}
            </p>
            <p>Cantidad seleccionada: {selectedRows.length}</p>
            <div className="pt-4">
              <input
                type="checkbox"
                id="genRep"
                name="subscribe"
                value={generateReport}
                onChange={setGenerateReport}
              />
              <label
                htmlFor="genRep"
                className="pl-2"
              >
                Generar reporte .xlsx?
              </label>
            </div>
          </div>

          <div className="pt-4">
            {massiveAction === 'delete' && <DeleteProds />}
            {massiveAction === 'changeStatus' && <ChangeStatus />}
            {massiveAction === 'changePrice' && <ChangePrice />}
          </div>

          <div className="mt-4 flex justify-between items-center w-full">
            <button
              className="btn-cancel"
              onClick={handleCancelDelete}
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
              {actions.find((el) => el.id === massiveAction)?.value}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ModalActions;
