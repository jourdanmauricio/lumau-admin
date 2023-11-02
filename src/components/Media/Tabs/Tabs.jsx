/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { createImage, createCloudImage } from '@/services/api/images.api';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import UploadImage from '../UploadImage/UploadImage';
import Gallery from '../Gallery/Gallery';
import Spinner from '@/components/Spinner/Spinner';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useUserStore } from '@/store/user';

const Tabs = ({ handleSelect }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [picture, setPicture] = useState(null);
  const user = useUserStore((state) => state.user);

  const [toggleState, setToggleState] = useState(2);
  const dispatchNotif = useNotification();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        let images = [];
        var folderUrl = `https://res.cloudinary.com/${user.cloudName}/image/list/${user.cloudFolder}.json`;

        fetch(folderUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            data.resources.forEach(function (resource) {
              console.log('data.resources', data.resources);
              images.push({
                id: resource.public_id,
                secureUrl: `https://res.cloudinary.com/${user.cloudName}/image/upload/v${resource.version}/${resource.public_id}.${resource.format}`,
              });
            });
            setImages(images);
          })
          .catch(function (error) {
            console.error(error);
          });

        setLoading(true);
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

    console.log('load cloudinary');

    // loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (delImg) => {
    const newImages = images.filter((image) => image.id !== delImg);
    setImages(newImages);
  };

  const handleAddPict = async (file) => {
    try {
      setLoading(true);
      const cloudImage = await createCloudImage(file, user);

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

      setImages([
        { id: upload.publicId, secureUrl: upload.secureUrl },
        ...images,
      ]);
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
      {location.pathname !== '/sections/images' && (
        <>
          <h2 className="title-modal">Imágenes</h2>
          <hr className="mt-1" />
        </>
      )}
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
            <span>Upload Cloudinary</span>
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
              handleSelect={handleSelect}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
