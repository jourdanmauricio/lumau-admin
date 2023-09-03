import '@/components/lumau-message.js';
/* eslint-disable react/prop-types */
const NewEditNote = ({ onSubmit, action, onChangeAction, editData }) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      id="notes-form"
    >
      <div className="relative">
        <lumau-message
          id="form-error"
          errorForm=""
        ></lumau-message>
      </div>
      <div className="relative p-5 bg-slate-100 dark:bg-slate-900">
        <div className="w-full">
          <lumau-input
            class="lumau-input"
            small
            id="name"
            label="Nombre"
            name="name"
            placeholder="Nota 1"
            pattern="^.{1,255}$"
            patternerror="Máximo 255 caracteres"
            value={editData.name}
            selectOnFocus
            required
          ></lumau-input>
        </div>

        <div className="w-full">
          <lumau-text-area
            class="lumau-input"
            id="value"
            label="Valor"
            name="value"
            placeholder="Para no olvidar..."
            //pattern="^.{1,5000}$"
            rows="6"
            patternerror="Máximo 5000 caracteres"
            value={editData.value}
            // selectOnFocus
            required
          ></lumau-text-area>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => onChangeAction('VIEW')}
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
      </div>
    </form>
  );
};

export default NewEditNote;
