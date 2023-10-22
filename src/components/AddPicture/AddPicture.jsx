/* eslint-disable react/prop-types */
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Modal/Modal';
import Media from '@/components/Media/Media';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Tooltip from '@/components/Tooltip/Tooltip';
import '@/components/lumau-input.js';
import { useState } from 'react';

const AddPicture = ({ currentData }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [image, setImage] = useState(currentData.image);
  const [altImage, setAltImage] = useState(currentData.altImage);

  const handleSelect = (url) => {
    const path = url.split('/');
    const altImage = path[path.length - 1];
    const altImage2 = document.getElementById('altImage');
    altImage2.focus();

    setAltImage(`Imagen ${altImage}`);

    setImage(url);
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="mt-5">
          <div className="w-[150px] self-center justify-center mx-auto">
            <img
              className="rounded border border-solid border-gray-400 w-[150px]  object-contain aspect-square"
              src={image}
              alt=""
            />
          </div>

          <Tooltip
            content="Seleccionar imagen"
            position="top"
          >
            <button
              type="button"
              className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
              onClick={openModal}
            >
              <FaCloudUploadAlt className="text-teal-500 text-4xl" />
            </button>
          </Tooltip>
        </div>

        <div className="w-full">
          <lumau-input
            small
            id="altImage"
            label="Texto alternativo para la imagen"
            name="altImage"
            placeholder="Texto alternativo"
            value={altImage}
            selectOnFocus
          ></lumau-input>

          <lumau-input
            small
            id="image"
            label="Imagen"
            name="image"
            placeholder="Imagen"
            value={image}
            selectOnFocus
          ></lumau-input>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={closeModal}
        >
          <Media handleSelect={handleSelect} />
        </Modal>
      )}
    </>
  );
};

export default AddPicture;
