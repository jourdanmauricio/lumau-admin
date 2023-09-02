/* eslint-disable react/prop-types */
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const ViewNote = ({ note, onDelete, onUpdate, onDetail }) => {
  return (
    <div className="inline-block p-4 border border-solid dark:border-gray-600 border-gray-200 rounded min-w-[150px] min-h-[80px] shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
      <p className="text-center pb-2">{note.name}</p>
      <hr />

      <div className="flex justify-evenly pt-4">
        <button
          className="p-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full"
          onClick={() => onDetail(note)}
        >
          <FaEye className="text-violet-500"></FaEye>
        </button>
        <button
          className="p-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full"
          onClick={() => onUpdate(note)}
        >
          <FaEdit className="text-blue-500"></FaEdit>
        </button>
        <button
          className="p-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full"
          onClick={() => onDelete(note)}
        >
          <FaTrashAlt className="text-red-500"></FaTrashAlt>
        </button>
      </div>
    </div>
  );
};

export default ViewNote;
