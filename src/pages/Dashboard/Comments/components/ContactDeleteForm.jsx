import React from 'react';

const ContactDeleteForm = ({
  dataToDelete,
  handleDelete,
  handleCancelDelete,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete(dataToDelete.id);
  };

  return (
    <form className="confirm__delete" onSubmit={handleSubmit}>
      <h2 className="title">Eliminar Mensaje</h2>
      <p className="delete__paragraph">
        Esta seguro de eliminar el mensaje {dataToDelete?.id}?{' '}
      </p>
      <div className="delete__actions">
        <button
          className="btn__secondary"
          onClick={handleCancelDelete}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        <button className="btn__primary" id="delete" type="submit">
          Eliminar
        </button>
      </div>
    </form>
  );
};

export default ContactDeleteForm;
