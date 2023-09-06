/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

const NewEditLoan = ({ onSubmit, action, onCancelDelete, currentData }) => {
  return (
    <form
      id="users-form"
      className="h-full flex flex-col gap-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="bg-text-color">
          {action === 'NEW' && 'Nuevo tipo de préstamo'}
          {action === 'EDIT' && 'Editar tipo de préstamo'}
          {action === 'DETAIL' && 'Detalle del tipo de préstamo'}
        </h2>
        <hr className="mt-1" />
      </div>
      <div className="flex-grow">
        {/* tipo y cant max cuotas */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className=" w-full sm:w-1/2">
            <lumau-input
              small
              id="type"
              label="Tipo de préstamo"
              name="type"
              placeholder="Hipoteca"
              value={currentData.type}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="maxQuantityQuotes"
              label="Cant max cuotas"
              name="maxQuantityQuotes"
              placeholder="60"
              pattern="^[0-9]{0,8}$"
              patternerror="Ingrese solo los números"
              value={currentData.maxQuantityQuotes}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>

        {/* Monto máximo / Tasa de interés */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="maxAmount"
              label="Monto máximo"
              name="maxAmount"
              placeholder="60000"
              pattern="^[0-9.]{0,8}$"
              patternerror="Ingrese solo los números"
              value={currentData.maxAmount}
              selectOnFocus
              required
            ></lumau-input>
          </div>
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="rate"
              label="Tasa de interés"
              name="rate"
              placeholder="7,8"
              pattern="^[0-9.]{0,8}$"
              patternerror="Ingrese solo los números"
              value={currentData.rate}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>
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
export default NewEditLoan;
