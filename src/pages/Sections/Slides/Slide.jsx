/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';
import AddPicture from '@/components/AddPicture/AddPicture';

const Slide = ({ onSubmit, action, onCancelDelete, currentData }) => {
  return (
    <form
      id="post-form"
      className="h-full flex flex-col gap-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="bg-text-color">
          {action === 'NEW' && 'Nuevo slide'}
          {action === 'EDIT' && 'Editar slide'}
        </h2>
        <hr className="mt-1" />
      </div>
      <div className="flex-grow">
        {/* Titulo */}
        <div className="w-full">
          <lumau-input
            small
            id="title"
            label="Título"
            name="title"
            placeholder="Título del slide"
            pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
            patternerror="Ingrese letras o espacios"
            value={currentData.title}
            selectOnFocus
            required
          ></lumau-input>
        </div>

        {/* Type / Order */}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-start">
          <div className="w-full flex flex-col sm:w-1/2">
            <lumau-input
              small
              id="type"
              label="Tipo"
              name="type"
              placeholder="Tipo de slide"
              pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
              patternerror="Ingrese letras o espacios"
              value={currentData.type}
              selectOnFocus
              required
            ></lumau-input>
          </div>

          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="order"
              label="Orden de aparición"
              name="order"
              placeholder="1"
              pattern="^[0-9.]{0,3}$"
              patternerror="Ingrese solo los números"
              value={currentData.order}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>

        {/* image / alt image */}
        <div className="mt-8">
          <AddPicture currentData={currentData} />
        </div>

        {/* Sections / Order */}
      </div>

      {/* Controles */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onCancelDelete}
          className="btn-cancel"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-confirm"
        >
          {action === 'NEW' ? 'Crear' : 'Editar'}
        </button>
      </div>
    </form>
  );
};
export default Slide;
