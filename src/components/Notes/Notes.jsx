import ViewNotes from './ViewNotes';
import NewEditNote from './NewEditNote';
import useNotes from './useNotes';
import DetailNote from './DetailNote';

import '@/components/lumau-input.js';
import '@/components/lumau-text-area.js';

const Notes = () => {
  const {
    notes,
    editData,
    //  myRefs,
    action,
    onChangeAction,
    //  onCopy,
    onUpdate,
    onDelete,
    onSubmit,
    onDetail,
  } = useNotes();

  return (
    <>
      <h2 className="text-gray-950 mt-2 text-center text-xl font-bold">
        {action === 'VIEW' && 'Notas'}
        {action === 'NEW' && 'Nueva nota'}
        {action === 'EDIT' && 'Edit nota'}
        {action === 'DETAIL' && 'Detalle de la nota'}
      </h2>
      <hr className="mt-1" />

      {action === 'VIEW' && (
        <ViewNotes
          notes={notes}
          onChangeAction={onChangeAction}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDetail={onDetail}
        />
      )}
      {(action === 'NEW' || action === 'EDIT') && (
        <NewEditNote
          onSubmit={onSubmit}
          action={action}
          onChangeAction={onChangeAction}
          editData={editData}
        />
      )}
      {action === 'DETAIL' && (
        <DetailNote
          note={editData}
          onChangeAction={onChangeAction}
        />
      )}
    </>
  );
};

export default Notes;
