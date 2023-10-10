/* eslint-disable react/prop-types */
import { FaEye, FaTrash } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import DeleteImage from '../DeleteImage/DeleteImage';
// import DetailImage from '../DetailImage/DetailImage';
import { useLocation } from 'react-router-dom';

const Gallery = ({
  images,
  handleDelete,
  selected,
  setSelected,
  isOpenModalDelete,
  openModalDelete,
  closeModalDelete,
  // isOpenModalDetail,
  // openModalDetail,
  // closeModalDetail,
  handleSelect,
}) => {
  const isSelected = (id) => {
    return id === selected?.id ? false : true;
  };

  const onSelect = (image) => {
    setSelected(image);
  };

  const onDeleteImage = (image) => {
    setSelected(image);
    openModalDelete();
  };

  const onViewImage = (image) => {
    setSelected(image);
    // openModalDetail();
  };

  const handleCancelDelete = () => {
    setSelected(null);
    closeModalDelete();
    // closeModalDetail();
  };

  const onDoubleClick = (image) => {
    handleSelect(image.secureUrl);
  };

  const location = useLocation();

  return (
    <>
      <div className="grid__image mt-5 p-5 min-h-[380px]">
        {images &&
          images.map((image) => (
            <div
              key={image.id}
              onClick={() => onSelect(image)}
              onDoubleClick={() => onDoubleClick(image)}
              className={`relative p-2 flex justify-center items-center rounded border border-solid  shadow-[0_1px_4px_rgba(0,0,0,0.16)] min-h-[100px] max-h-[100px] max-w-[100px] mx-auto group ${
                isSelected(image.id)
                  ? 'border-gray-500'
                  : 'border-blue-800 shadow-[1px_1px_20px_rgba(0,0,0,0.50)]'
              }`}
            >
              <img
                src={image.secureUrl}
                alt={image.filename}
                width="100"
                height="100"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 transition ease-in-out delay-150 opacity-0 group-hover:opacity-100">
                <div
                  onClick={() => onDeleteImage(image)}
                  className="p-2 hover:bg-gray-900 hover:bg-opacity-5 rounded-full cursor-pointer"
                >
                  <FaTrash
                    color="rgb(239 68 68)"
                    size={20}
                  />
                </div>
                <div
                  onClick={() => onViewImage(image)}
                  className="p-2 hover:bg-gray-900 hover:bg-opacity-5 rounded-full cursor-pointer"
                >
                  <FaEye
                    color="rgb(20 184 166)"
                    size={20}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {location.pathname !== '/sections/images' && selected && (
        <button
          onClick={() => onDoubleClick(selected)}
          className="btn-confirm mb-5 block ml-auto"
        >
          Seleccionar
        </button>
      )}
      <Modal
        isOpenModal={isOpenModalDelete}
        closeModal={closeModalDelete}
        capa="2"
      >
        <DeleteImage
          image={selected}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
      {/* <Modal
        isOpenModal={isOpenModalDetail}
        closeModal={closeModalDetail}
        capa="2"
      >
        <DetailImage
          image={selected}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal> */}
    </>
  );
};

export default Gallery;
