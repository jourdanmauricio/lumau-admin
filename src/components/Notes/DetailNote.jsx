/* eslint-disable react/prop-types */
const DetailNote = ({ note, onChangeAction }) => {
  return (
    <>
      <section className="flex gap-4 flex-col justify-start items-center min-h-[320px] text-gray-900 dark:text-slate-100 bg-slate-100 dark:bg-gray-900 p-4">
        <h3>{note.name}</h3>
        <div className="w-full">
          <lumau-text-area
            class="lumau-input"
            id="value"
            // label="Valor"
            name="value"
            placeholder="Para no olvidar..."
            //pattern="^.{1,5000}$"
            rows="10"
            patternerror="Máximo 5000 caracteres"
            value={note.value}
            selectOnFocus
            readonly
          ></lumau-text-area>
        </div>

        <button
          onClick={() => onChangeAction('VIEW')}
          className="block ml-auto btn-confirm"
        >
          Cerrar
        </button>
      </section>
    </>
  );
};

export default DetailNote;
