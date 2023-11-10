/* eslint-disable react/prop-types */
import { useState } from 'react';
import '@/components/lumau-input.js';
import '@/components/lumau-text-area.js';
import checkForm from '../../../utils/checkForm';

const InstagramPost = ({ data: currentData, handleSubmit }) => {
  const [isChecked, setIsChecked] = useState(
    currentData.sections.includes('instagram') ? true : false
  );

  const handleChangeShowWeb = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    console.log('Delete', currentData.id);
    handleSubmit(currentData, 'DELETE');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = checkForm(e);

    let newSections = currentData.sections;
    const index = newSections.findIndex((section) => section === 'instagram');
    if (isChecked) {
      if (index === -1) newSections.push('instagram');
    } else {
      if (index !== -1) newSections.splice(index, 1);
    }

    const obj = {
      id: currentData.id,
      content: data.content,
      order: parseInt(data.order),
      sections: newSections,
    };

    handleSubmit(obj, 'EDIT');
  };

  return (
    <div className="p-4">
      <div className="w-full p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50">
        <p>Título: {currentData.title}</p>
        <p>Permalink: {currentData.slug}</p>
        <p>Alt Imagen:{currentData.altImage}</p>
      </div>

      <form
        id="instagram-post-form"
        className="w-full mt-4 p-2 rounded border border-solid dark:border-gray-600 border-gray-200 shadow-xl dark:shadow-lg dark:shadow-gray-700/50 relative"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="flex gap-4 justify-between">
          <div className="flex gap-2  items-center">
            <input
              type="checkbox"
              id="showWeb"
              name="showWeb"
              checked={isChecked}
              onChange={handleChangeShowWeb}
            />
            Mostar en web
          </div>
          <lumau-input
            small
            id="order"
            type="number"
            label="Orden de aparición"
            name="order"
            placeholder="1"
            pattern="^[0-9.]{0,3}$"
            patternerror="Ingrese solo los números"
            value={currentData.order}
            selectOnFocus
            required
          ></lumau-input>
        </div>
        <div className="w-full">
          <lumau-text-area
            small
            id="content"
            label="Descripción"
            name="content"
            placeholder="Descripción del post 1"
            pattern="^[\s\S]{0,5000}$"
            patternerror="Máximo 255 caracteres"
            value={currentData.content}
            selectOnFocus
            required
          ></lumau-text-area>
        </div>

        <div className="mt-8 flex gap-2 justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="btn-confirm"
          >
            Eliminar
          </button>
          <button
            type="submit"
            className="btn-confirm"
          >
            Modificar
          </button>
        </div>
        <hr className="mt-8" />
      </form>
    </div>
  );
};

export default InstagramPost;
