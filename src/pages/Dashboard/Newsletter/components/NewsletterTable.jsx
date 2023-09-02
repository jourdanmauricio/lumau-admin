import React from "react";
import NewsletterTableRow from "./NewsletterTableRow";

const NewsletterTable = ({ deleteData, data }) => {
  return (
    <table className="table table__contact">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="6">Sin datos</td>
          </tr>
        ) : (
          data.map((el) => (
            <NewsletterTableRow key={el.id} el={el} deleteData={deleteData} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default NewsletterTable;
