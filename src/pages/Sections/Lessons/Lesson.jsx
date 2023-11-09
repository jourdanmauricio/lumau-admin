/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

const Lesson = ({ onSubmit, action, onCancelDelete, currentData }) => {
  return (
    <form
      id="lesson-form"
      className="h-full flex flex-col gap-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="bg-text-color">
          {action === 'NEW' && 'Nueva clase'}
          {action === 'EDIT' && 'Editar clase'}
        </h2>
        <hr className="mt-1" />
      </div>
      <div className="flex-grow">
        {/* Type / Order */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-start">
          <div className="w-full flex flex-col sm:w-1/2">
            <lumau-input
              small
              id="type"
              label="Tipo"
              name="type"
              placeholder="Yoga"
              pattern="^[\s\S]{0,100}$"
              patternerror="Máximo 100 caracteres"
              value={currentData.type}
              selectOnFocus
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

        {/* Días / Horarios */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-start">
          <div className="w-full flex flex-col sm:w-1/2">
            <lumau-input
              small
              id="days"
              label="Días"
              name="days"
              placeholder="Martes y jueves"
              pattern="^[\s\S]{0,100}$"
              patternerror="Máximo 100 caracteres"
              value={currentData.days}
              selectOnFocus
              required
            ></lumau-input>
          </div>

          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="hours"
              label="Horario"
              name="hours"
              placeholder="14 a 15 hs"
              pattern="^[\s\S]{0,100}$"
              patternerror="Máximo 100 caracteres"
              value={currentData.hours}
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
export default Lesson;
