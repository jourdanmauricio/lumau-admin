import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatDateTable } from '@/helpers/helpFunctions';

const NewsletterTableRow = ({ el, deleteData }) => {
  let { name, email, createdAt } = el;
  return (
    <tr>
      <td data-titulo="Nombre">{name}</td>
      <td data-titulo="Email">{email}</td>
      <td data-titulo="Fecha">{formatDateTable(createdAt)}</td>
      <td>
        <button onClick={() => deleteData(el)}>
          <FaRegTrashAlt className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default NewsletterTableRow;
