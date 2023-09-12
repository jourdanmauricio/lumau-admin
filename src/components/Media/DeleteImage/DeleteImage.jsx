/* eslint-disable react/prop-types */
const DeleteImage = ({ image, handleCancelDelete, handleDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };
  return (
    <>
      <h2 className="title-modal">Eliminar Imágen</h2>
      <hr className="mt-1" />

      <div className="relative">
        <lumau-message
          id="form-error-delete-image"
          errorForm=""
        ></lumau-message>
      </div>
      <form className="bg-white p-10 flex flex-col justify-center items-center">
        <p className="text-center font-medium text-gray-800 my-6 mx-0">
          Esta seguro de eliminar la imágen <i>{image?.filename}</i>?
        </p>
        <div className="mt-4 flex justify-between items-center w-full">
          <button
            className="btn__secondary"
            onClick={handleCancelDelete}
            id="cancel"
            type="button"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn__primary"
            id="delete"
            onClick={handleSubmit}
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteImage;
