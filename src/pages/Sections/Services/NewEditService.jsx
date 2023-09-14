/* eslint-disable react/prop-types */

import '@/components/lumau-input.js';
import '@/components/lumau-text-area.js';
import '@/components/lumau-message.js';
import AddPicture from '../../../components/AddPicture/AddPicture';

const NewEditService = ({ onSubmit, action, onCancelDelete, currentData }) => {
  return (
    <div>
      <div className="relative">
        <lumau-message
          id="form-error-service"
          errorForm=""
        ></lumau-message>
      </div>

      <form
        id="services-form"
        className="h-full flex flex-col gap-4"
        onSubmit={onSubmit}
        noValidate
      >
        <div>
          <h2 className="bg-text-color">
            {action === 'NEW' && 'Nuevo servicio'}
            {action === 'EDIT' && 'Editar servicio'}
            {action === 'DETAIL' && 'Detalle del servicio'}
          </h2>
          <hr className="mt-1" />
        </div>
        <div className="flex-grow">
          {/* title / order */}
          <div className="flex flex-col sm:flex-row md:gap-8 w-full justify-center items-center">
            <div className=" w-full sm:w-3/4">
              <lumau-input
                small
                id="title"
                label="Título del servicio"
                name="title"
                placeholder="Servicio"
                value={currentData.title}
                selectOnFocus
                required
              ></lumau-input>
            </div>
            <div className="w-full sm:w-1/4">
              <lumau-input
                small
                id="order"
                label="Orden de aparición"
                name="order"
                placeholder="1"
                pattern="^[0-9]{0,2}$"
                patternerror="Ingrese solo los números"
                value={currentData.order}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>
          {/* Content */}
          <div className="w-full">
            <div className=" w-full">
              <lumau-text-area
                small
                id="content"
                label="Descripción del servicio"
                name="content"
                placeholder="Descripción"
                value={currentData.content}
                selectOnFocus
              ></lumau-text-area>
            </div>
          </div>
          {/* image / alt image */}
          <div className="mt-8">
            <AddPicture currentData={currentData} />
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-between">
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
    </div>
  );
};
export default NewEditService;
