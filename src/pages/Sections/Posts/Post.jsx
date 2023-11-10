/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-text-area.js';
import '@/components/lumau-message.js';

import TextEditor from '@/components/TextEditor/TextEditor';
import AddPicture from '@/components/AddPicture/AddPicture';
import { useEffect, useRef, useState } from 'react';
import { sections } from '@/config/variables';
import { usePostsStore } from '@/store/posts';
import { useNotification } from '@/components/Notifications/NotificationProvider';

const Post = ({ onCancelDelete }) => {
  const dispatchNotif = useNotification();
  const { action, onSubmit, currentData } = usePostsStore();

  const [slug, setSlug] = useState(currentData.slug);
  const handleChangeTitle = (e) => {
    const slug = e.target.value
      .trim()
      .replace(/\s+/g, '-')
      .replace(/,+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    setSlug(slug);
  };

  const titleRef = useRef();

  useEffect(() => {
    let inputTitle = null;

    if (titleRef.current) {
      titleRef.current.addEventListener('event', handleChangeTitle);
      inputTitle = titleRef.current;
    }

    return () => {
      if (inputTitle) {
        inputTitle.removeEventListener('event', handleChangeTitle);
      }
    };
  });

  const handleSubmit = async (e) => {
    try {
      await onSubmit(e);
      if (action === 'NEW') {
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Post creado!',
        });
      } else {
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Post modificado!',
        });
      }
      const formError = document.getElementById('form-error-posts');
      formError.setAttribute('errorForm', '');
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: 'Error modificando el Post',
      });
      const formError = document.getElementById('form-error-posts');
      formError.setAttribute('errorForm', error);
    }
  };

  return (
    <form
      id="post-form"
      className="h-full flex flex-col gap-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <h2 className="bg-text-color">
          {action === 'NEW' && 'Nuevo post'}
          {action === 'EDIT' && 'Editar post'}
        </h2>
        <hr className="mt-1" />
      </div>
      <div className="flex-grow">
        {/* Título */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="w-full">
            <lumau-input
              ref={titleRef}
              small
              id="title"
              label="Título"
              name="title"
              placeholder="Título del post 1"
              pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
              patternerror="Ingrese letras o espacios"
              value={currentData.title}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="w-full">
            <lumau-input
              small
              id="slug"
              label="Slug"
              name="slug"
              placeholder="path-del-post"
              pattern="[A-Za-z0-9 -ñáéíóúÑÁÉÍÓÚ]{0,255}$"
              patternerror="Ingrese letras o espacios"
              value={slug}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>

        {/* Resumen */}
        <div className="w-full">
          <lumau-text-area
            small
            id="excerpt"
            label="Resumen"
            name="excerpt"
            placeholder="Resumen del post 1"
            pattern="^[\s\S]{0,5000}$"
            patternerror="Máximo 255 caracteres"
            value={currentData.excerpt}
            selectOnFocus
          ></lumau-text-area>
        </div>

        {/* Contenido */}
        <div className="w-full min-h-[250px] border border-slate-400 bg-slate-700 rounded">
          <TextEditor data={currentData.content} />
        </div>

        {/* image / alt image */}
        <div className="mt-8">
          <AddPicture currentData={currentData} />
        </div>

        {/* Sections / Order */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-start">
          <div className="w-full flex flex-col sm:w-1/2 h-[150px]">
            <label
              htmlFor="sections"
              className="text-sm"
            >
              Secciones
            </label>
            <select
              className="h-full p-1 dark:bg-slate-700 bg-slate-100 border border-slate-600 rounded overflow-auto"
              name="sections"
              id="sections"
              defaultValue={currentData.sections}
              multiple
            >
              {sections.map((section) => (
                <option
                  key={section.id}
                  value={section.id}
                >
                  {section.value}
                </option>
              ))}
              {/* <option value="blog">Blog</option>
              <option value="home">Home</option>
              <option value="gallery">Galería</option> */}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              type="number"
              id="order"
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
        </div>
        <input
          type="hidden"
          name="type"
          id="type"
          value="post"
        />
      </div>

      {/* Controles */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onCancelDelete}
          className="btn-cancel"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-confirm"
        >
          {action === 'NEW' ? 'Crear' : 'Editar'}
        </button>
      </div>
    </form>
  );
};
export default Post;
