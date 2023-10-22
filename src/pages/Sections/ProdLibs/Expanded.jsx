/* eslint-disable react/prop-types */
const Expanded = ({ data }) => {
  return (
    <div className="p-4">
      <div className="flex gap-8">
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Categoría Web: {data.categoryWeb}</p>
          <p>Slug: {data.slug}</p>
          <p>Detalle: {data.excerpt}</p>
          <p>Alt Imagen:{data.altImage}</p>
          <p>Secciones:{data.sections}</p>
          <p>Tipo: {data.type}</p>
          <p>Orden: {data.order}</p>
        </div>
        <div className="w-full md:w1/2 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
          <p>Proveedor: {data.supplier}</p>
          <p>Costo: {data.costPrice}</p>
          <p>IVA: {data.iva}</p>
          <p>Minorista: {data.price}</p>
          <p>Mayorista: {data.wholesalePrice}</p>
          <p>Máximo: {data.maxPrice}</p>
        </div>
      </div>
      <div className="ql-snow">
        <div
          className="p-4 mt-4 ql-editor"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></div>
      </div>
    </div>
  );
};
export default Expanded;
