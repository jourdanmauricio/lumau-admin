/* eslint-disable react/prop-types */
import ViewNote from './ViewNote';
const ViewNotes = ({ notes, onChangeAction, onDelete, onUpdate, onDetail }) => {
  return (
    <>
      <section className="text-gray-900 dark:text-slate-100 bg-slate-100 dark:bg-gray-900 p-2">
        <div className="relative">
          <lumau-message
            id="form-error"
            errorForm=""
          ></lumau-message>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center mt-8">
          {notes.map((note) => (
            <ViewNote
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onDetail={onDetail}
            ></ViewNote>
          ))}
        </div>
        <div>
          <button
            onClick={() => onChangeAction('NEW')}
            className="block p-2 mt-4 ml-auto bg-violet-800 rounded text-white transition ease-in-out delay-100 hover:bg-purple-800/70
          hover:cursor-pointer"
          >
            Nueva
          </button>
        </div>
      </section>
    </>
  );
};

export default ViewNotes;
