/* eslint-disable react/prop-types */
const DeleteOffice = ({ currentData, onDelete, onCancelDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(currentData.id);
  };

  return (
    <>
      <h2 className="title-modal">Eliminar Slide</h2>
      <hr className="mt-1" />

      <div className="relative">
        <lumau-message
          id="form-error-delete-office"
          errorForm=""
        ></lumau-message>
      </div>
      <div>
        <form
          className="p-10 bg-text-color flex justify-center items-center flex-col"
          onSubmit={handleSubmit}
        >
          <p className="text-center font-medium text-base my-5">
            Esta seguro de eliminar la oficina {currentData.id}?
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
export default DeleteOffice;
