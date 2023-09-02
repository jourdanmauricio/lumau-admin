import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatDateTable } from '@/helpers/helpFunctions';

const ContactTableRow = ({ el, deleteData }) => {
  let { name, phone, email, comment, createdAt } = el;
  return (
    <tr>
      <td data-titulo="Nombre">{name}</td>
      <td data-titulo="Teléfono">{phone}</td>
      <td data-titulo="Email">{email}</td>
      <td data-titulo="Fecha">{formatDateTable(createdAt)}</td>
      <td data-titulo="Comentario">{comment}</td>
      <td>
        <button
          onClick={() => deleteData(el)}
          className="table__icon table__icon--delete"
        >
          <FaRegTrashAlt className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default ContactTableRow;
