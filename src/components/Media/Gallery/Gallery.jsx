/* eslint-disable react/prop-types */
import { useState } from 'react';
import FilterCategoryWeb from './FilterCategoryWeb';
import ItemGallery from './ItemGallery';
import { useLocation } from 'react-router-dom';

const Gallery = ({ images, handleSelect, handleDelete, setLoading }) => {
  const [selected, setSelected] = useState(null);
  console.log('images', images);
  const location = useLocation();

  const onSelect = (selected) => setSelected(selected);

  return (
    <>
      <FilterCategoryWeb />
      <div className="grid__image mt-5 p-5 min-h-[380px]">
        {images &&
          images.map((image) => (
            <ItemGallery
              key={image.id}
              image={image}
              onSelect={onSelect}
              selected={selected}
              handleSelect={handleSelect}
              handleDelete={handleDelete}
              setLoading={setLoading}
            />
          ))}
      </div>

      {location.pathname !== '/sections/images' && selected && (
        <button
          onClick={() => handleSelect(selected.secureUrl)}
          className="btn-confirm mb-5 block ml-auto"
        >
          Seleccionar
        </button>
      )}
    </>
  );
};

export default Gallery;
