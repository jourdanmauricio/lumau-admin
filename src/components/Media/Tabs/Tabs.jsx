/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  createImage,
  createCloudImage,
  deleteImage,
  getImages,
} from '../../../services/api/images.api';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import UploadImage from '@/components/UploadImage/UploadImage';
import Gallery from '../Gallery/Gallery';
import { useModal } from '@/hooks/useModal';
import Spinner from '@/components/Spinner/Spinner';
import { useNotification } from '../../Notifications/NotificationProvider';
import '@/components/lumau-message.js';
import { useUserStore } from '@/store/user';

const Tabs = ({ handleSelect }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [selected, setSelected] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);
  const [isOpenModalDetail, openModalDetail, closeModalDetail] =
    useModal(false);
  const user = useUserStore((state) => state.user);

  const [toggleState, setToggleState] = useState(2);
  const dispatchNotif = useNotification();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const images = await getImages(user);
        setImages(images);
      } catch (error) {
        let message = 'Error obteniendo imágenes 😞';
        if (error.response)
          message = `${error.response.status}: ${error.response.statusText}`;

        const formError = document.getElementById('form-error-del-image');
        formError.setAttribute('errorForm', message);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log('selected', selected);
      await deleteImage(selected.id);
      const newImages = images.filter((image) => image.id === selected.id);
      setSelected(null);
      closeModalDelete();
      setImages(newImages);
    } catch (error) {
      console.log('ERRRRORRRRR', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPict = async (file) => {
    try {
      setLoading(true);
      const cloudImage = await createCloudImage(file);
      console.log('cloudImage', cloudImage);
      const obj = {
        id: cloudImage.id,
        assetId: cloudImage.asset_id,
        bytes: cloudImage.bytes,
        etag: cloudImage.etag,
        folder: cloudImage.folder,
        format: cloudImage.format,
        height: cloudImage.height,
        width: cloudImage.width,
        originalFilename: cloudImage.original_filename,
        publicId: cloudImage.public_id,
        resourceType: cloudImage.resource_type,
        secureUrl: cloudImage.secure_url,
        signature: cloudImage.signature,
        type: cloudImage.type,
        url: cloudImage.url,
      };

      const upload = await createImage(obj);

      console.log('upload', upload);

      setImages([upload, ...images]);
      setToggleState(2);
      setPicture(null);
    } catch (error) {
      console.log('Error', error);
      dispatchNotif({
        type: 'ERROR',
        message: 'Error cargando la imagen',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title-modal">Imágenes</h2>
      <hr className="mt-1" />
      <div className="tabs__container mt-2">
        {loading && <Spinner />}
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaCloudUploadAlt
              color="teal"
              size={20}
            />
            <span>Upload Clodinary</span>
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages
              color="green"
              size={20}
            />
            <span>Galería</span>
          </div>
        </div>
        <div className="tabs__content">
          <div
            className={
              toggleState === 1
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <UploadImage
              handleAddPict={handleAddPict}
              picture={picture}
              setPicture={setPicture}
            />
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Gallery
              images={images}
              handleDelete={handleDelete}
              selected={selected}
              setSelected={setSelected}
              isOpenModalDelete={isOpenModalDelete}
              openModalDelete={openModalDelete}
              closeModalDelete={closeModalDelete}
              isOpenModalDetail={isOpenModalDetail}
              openModalDetail={openModalDetail}
              closeModalDetail={closeModalDetail}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
