/* eslint-disable react/prop-types */
import AddPicture from '@/components/AddPicture/AddPicture';
import TextEditor from '@/components/TextEditor/TextEditor';
import { status as prodStatus, sections } from '@/config/variables';
import { useProdLibsStore } from '@/store/prodLib';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import '@/components/lumau-input.js';
import '@/components/lumau-text-area.js';
import '@/components/lumau-message.js';

const ProdLib = ({ onCancelDelete }) => {
  const dispatchNotif = useNotification();
  const { currentData, action, onSubmit } = useProdLibsStore();

  const handleSubmit = async (e) => {
    try {
      await onSubmit(e);
      if (action === 'NEW') {
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Producto creado!',
        });
      } else {
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Producto modificado!',
        });
      }
      const formError = document.getElementById('form-error-prod-lib');
      formError.setAttribute('errorForm', '');
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: 'Error modificando el producto',
      });
      const formError = document.getElementById('form-error-prod-lib');
      formError.setAttribute('errorForm', error);
    }
  };
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-prod-lib"
          errorForm=""
        ></lumau-message>
      </div>

      <form
        id="prod-lib"
        name="prod-lib"
        className="h-full flex flex-col gap-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <h2 className="bg-text-color">
            {action === 'NEW' && 'Nuevo Producto'}
            {action === 'EDIT' && 'Editar Producto'}
          </h2>
          <hr className="mt-1" />
        </div>

        <div className="flex-grow">
          {/* ID / Order */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="w-full sm:w-1/2">
              {action === 'EDIT' ? (
                <lumau-input
                  // ref={titleRef}
                  small
                  id="id"
                  label="Artículo"
                  name="id"
                  placeholder="Id del artículo"
                  // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                  // patternerror="Ingrese letras o espacios"
                  value={currentData.id}
                  selectOnFocus
                  disabled
                  required
                ></lumau-input>
              ) : (
                <lumau-input
                  // ref={titleRef}
                  small
                  id="id"
                  label="Artículo"
                  name="id"
                  placeholder="Id del artículo"
                  // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                  // patternerror="Ingrese letras o espacios"
                  value={currentData.id}
                  selectOnFocus
                  required
                ></lumau-input>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <lumau-input
                small
                id="order"
                label="Orden de aparición"
                name="order"
                placeholder="1"
                pattern="^[0-9.]{0,3}$"
                patternerror="Ingrese solo los números"
                value={currentData.order}
                selectOnFocus
              ></lumau-input>
            </div>
          </div>
          {/* Nombre */}
          <div className="w-full">
            <lumau-input
              small
              id="name"
              label="Nombre"
              name="name"
              placeholder="Nombre del producto"
              // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
              // patternerror="Ingrese letras o espacios"
              value={currentData.name}
              selectOnFocus
              required
            ></lumau-input>
          </div>
          {/* Category / CategoryWeb */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="w-full">
              <lumau-input
                // ref={titleRef}
                small
                id="category"
                label="Categoría"
                name="category"
                placeholder="Nombre de la categoría"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.category}
                selectOnFocus
                required
              ></lumau-input>
            </div>

            <div className="w-full">
              <lumau-input
                // ref={titleRef}
                small
                id="categoryWeb"
                label="Categoría Web"
                name="categoryWeb"
                placeholder="Nombre de la categoría Web"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.categoryWeb}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>
          {/* CostPrice / Price */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="w-full">
              <lumau-input
                small
                id="costPrice"
                label="Precio Costo"
                name="costPrice"
                placeholder="Costo"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.costPrice}
                selectOnFocus
                required
              ></lumau-input>
            </div>

            <div className="w-full">
              <lumau-input
                small
                id="price"
                label="Precio"
                name="price"
                placeholder="Precio Minorista"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.price}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>
          {/* CostPrice / Price */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="w-full">
              <lumau-input
                small
                id="wholesalePrice"
                label="Precio Mayorista"
                name="wholesalePrice"
                placeholder="Precio Mayorista"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.wholesalePrice}
                selectOnFocus
                required
              ></lumau-input>
            </div>

            <div className="w-full">
              <lumau-input
                small
                id="maxPrice"
                label="Precio Máximo"
                name="maxPrice"
                placeholder="Precio Máximo"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.maxPrice}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>

          {/* CostPrice / Price */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <div className="w-full">
              <lumau-input
                small
                id="iva"
                label="IVA"
                name="iva"
                placeholder="IVA"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.iva}
                selectOnFocus
                required
              ></lumau-input>
            </div>

            <div className="w-full">
              <lumau-input
                small
                id="other"
                label="Otro"
                name="other"
                placeholder="Otro"
                // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
                // patternerror="Ingrese letras o espacios"
                value={currentData.other}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>

          {/* Proveedor */}
          <div className="w-full">
            <lumau-input
              small
              id="supplier"
              label="Proveedor"
              name="supplier"
              placeholder="Proveedor"
              // pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,255}$"
              // patternerror="Ingrese letras o espacios"
              value={currentData.supplier}
              selectOnFocus
              required
            ></lumau-input>
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
            <div className="w-full flex flex-col sm:w-1/2">
              <label
                htmlFor="sections"
                className="text-sm"
              >
                Secciones
              </label>
              <select
                className="p-1 dark:bg-slate-700 bg-slate-100 border border-slate-600 rounded overflow-auto h-[150px]"
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
              </select>
            </div>

            <div className="w-full sm:w-1/2 flex flex-col pb-4">
              <label
                htmlFor="status"
                className="text-sm"
              >
                Estado
              </label>
              <select
                className="py-[0.4rem] dark:bg-slate-700 bg-slate-100 border border-slate-600 rounded overflow-auto"
                name="status"
                id="status"
                defaultValue={currentData.status}
              >
                {prodStatus.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                  >
                    {status.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
    </>
  );
};
export default ProdLib;
