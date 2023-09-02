import React from "react";
import ContactTableRow from "./ContactTableRow";

const ContactTable = ({ deleteData, contact }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Nombre</th>
          <th style={{ width: "10%" }}>Teléfono</th>
          <th style={{ width: "20%" }}>Email</th>
          <th style={{ width: "10%" }}>Fecha</th>
          <th>Comentario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {contact.length === 0 ? (
          <tr>
            <td colSpan="6">Sin datos</td>
          </tr>
        ) : (
          contact.map((el) => (
            <ContactTableRow key={el.id} el={el} deleteData={deleteData} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContactTable;
