const DetailImage = ({ image, handleCancelDelete }) => {
  return (
    <form className="bg-white p-10 flex flex-col justify-center items-center">
      <h2 className="title">Detalle de la imagen</h2>
      <div className="w-full mt-4">
        {image && (
          <>
            <div className="flex">
              <span className="w-1/4">Id</span>
              <span className="w-3/4 break-words">{image.asset_id}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Modo</span>
              <span className="w-3/4">{image.access_mode}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Folder</span>
              <span className="w-3/4">{image.folder}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Nombre</span>
              <span className="w-3/4 break-words">{image.filename}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Formato</span>
              <span className="w-3/4">{image.format}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Tipo</span>
              <span className="w-3/4">{image.resource_type}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Width</span>
              <span className="w-3/4">{image.width}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Height</span>
              <span className="w-3/4">{image.height}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Ratio</span>
              <span className="w-3/4">{image.aspect_ratio}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Bytes</span>
              <span className="w-3/4">{image.bytes}</span>
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleCancelDelete}
        className="btn__primary mt-4"
        type="button"
      >
        Cerrar
      </button>
    </form>
  );
};

export default DetailImage;
