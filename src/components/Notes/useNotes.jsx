import { useEffect, useRef, useState } from 'react';
import { getAllNotes } from '@/services/api/notes.api';
import { createNote, deleteNote, updateNote } from '@/services/api/notes.api';
import { useNotification } from '@/components/Notifications/NotificationProvider';

const INITIAL_DATA = {
  name: '',
  value: '',
};

const useNotes = () => {
  const myRefs = useRef([]);
  const [notes, setNotes] = useState([]);
  const [action, setAction] = useState('VIEW');
  const [editData, setEditData] = useState(INITIAL_DATA);
  const dispatchNotif = useNotification();

  const fetchData = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeAction = (action) => {
    setAction(action);
    setEditData(INITIAL_DATA);
  };

  const onDelete = async (note) => {
    try {
      const { id } = await deleteNote(note.id);
      const newNotes = notes.filter((note) => note.id !== parseInt(id));
      setNotes(newNotes);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Nota eliminada',
      });
    } catch (error) {
      const formError = document.getElementById('form-error');
      formError.setAttribute('errorForm', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = document.querySelectorAll('[required], [pattern]');

    let error = false;
    for (let i = 0; i < fieldsToValidate.length; i++) {
      if (!fieldsToValidate[i].checkValidity()) {
        fieldsToValidate[i].setAttribute(
          'error',
          fieldsToValidate[i].validationMessage
        );
        error = true;
      }
    }
    if (error) return;

    const data = Object.fromEntries(new FormData(e.target));
    // const loading = document.getElementById('lumau-spinner');

    try {
      // loading.setAttribute('loading', true);

      if (action === 'NEW') {
        const resp = await createNote(data);
        setNotes([...notes, resp]);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Nota creada!',
        });
      } else {
        data.id = editData.id;
        const resp = await updateNote(data);

        const newNotes = notes.map((note) =>
          note.id === resp.id ? resp : note
        );
        setNotes(newNotes);
        setEditData(INITIAL_DATA);

        dispatchNotif({
          type: 'SUCCESS',
          message: 'Nota Modificada!',
        });
      }
      setAction('VIEW');
    } catch (error) {
      const formError = document.getElementById('form-error');
      formError.setAttribute('errorForm', error);
    } finally {
      // loading.removeAttribute('loading');
    }
  };

  const onUpdate = (note) => {
    setEditData(note);
    setAction('EDIT');
  };

  const onDetail = (note) => {
    console.log(note);
    setAction('DETAIL');
    setEditData(note);
  };

  const onCopy = (note) => {
    navigator.clipboard.writeText(note.value);
    myRefs.current[note.id].classList.remove('hidden');
    setTimeout(() => {
      myRefs.current[note.id].classList.add('hidden');
    }, 500);
  };

  return {
    notes,
    myRefs,
    editData,
    action,
    onChangeAction,
    onCopy,
    onDelete,
    onSubmit,
    onUpdate,
    onDetail,
  };
};

export default useNotes;
