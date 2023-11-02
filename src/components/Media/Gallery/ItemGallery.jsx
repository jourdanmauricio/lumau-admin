/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import Tooltip from '@/components/Tooltip/Tooltip';
import { FaTrash } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import DeleteImage from '../DeleteImage/DeleteImage';
import { useModal } from '@/hooks/useModal';
import { deleteImage } from '@/services/api/images.api';
import { useUserStore } from '@/store/user';

const ItemGallery = ({
  image,
  onSelect,
  selected,
  handleSelect,
  setLoading,
  handleDelete,
}) => {
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);
  const user = useUserStore((state) => state.user);

  const onCancelDelete = () => {
    console.log('Cancel');
    // onSelect(null);
    closeModalDelete();
  };

  // const onDeleteImage = (image) => {
  const onDeleteImage = () => {
    // onSelect(image);
    openModalDelete();
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const delImg = await deleteImage(image.id, user);
      handleDelete(delImg);
      // onSelect(null);
    } catch (error) {
      console.log('ERRRRORRRRR', error);
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (id) => (selected && selected.id === id ? true : false);

  return (
    <>
      <Tooltip
        content={image.id}
        position="top"
      >
        <div
          onClick={() => onSelect(image)}
          onDoubleClick={() => handleSelect(image.secureUrl)}
          className={`relative w-[100px] h-[100px] p-2 flex justify-center items-center rounded border border-solid  shadow-[0_1px_4px_rgba(0,0,0,0.16)] min-h-[100px] max-h-[100px] max-w-[100px] mx-auto group ${
            isSelected(image.id)
              ? 'border-blue-800 shadow-[1px_1px_20px_rgba(0,0,0,0.50)]'
              : 'border-gray-500'
          }`}
        >
          <img
            className="w-full h-full object-contain"
            src={image.secureUrl}
            alt={image.id}
          />
          <div className="absolute top-0 right-0 flex flex-col gap-2 transition ease-in-out delay-150 opacity-0 group-hover:opacity-100">
            <div
              onClick={() => onDeleteImage(image)}
              className="p-2 hover:bg-gray-900 hover:bg-opacity-5 rounded-full cursor-pointer"
            >
              <FaTrash
                color="rgb(239 68 68)"
                size={20}
              />
            </div>
          </div>
        </div>
      </Tooltip>
      <Modal
        isOpenModal={isOpenModalDelete}
        closeModal={closeModalDelete}
        capa="2"
      >
        <DeleteImage
          image={image}
          handleCancelDelete={onCancelDelete}
          handleDelete={onDelete}
        />
      </Modal>
    </>
  );
};
export default ItemGallery;
