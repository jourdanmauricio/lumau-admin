/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

const Office = ({ onSubmit, action, onCancelDelete, currentData }) => {
  return (
    <form
      id="office-form"
      className="h-full flex flex-col gap-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="bg-text-color">
          {action === 'NEW' && 'Nuevo oficina'}
          {action === 'EDIT' && 'Editar oficina'}
          {/* {action === 'DETAIL' && 'Detalle del tipo de préstamo'} */}
        </h2>
        <hr className="mt-1" />
      </div>
      <div className="flex-grow">
        {/* Ciudad y codigo postal */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className=" w-full sm:w-1/2">
            <lumau-input
              small
              id="city"
              label="Ciudad"
              name="city"
              placeholder="La Plata"
              pattern="[A-Za-z ñáéíóúÑÁÉÍÓÚ]{0,100}$"
              patternerror="Ingrese letras o espacios"
              value={currentData.city}
              selectOnFocus
              required
            ></lumau-input>
          </div>
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="cp"
              label="Código postal"
              name="cp"
              placeholder="1900"
              pattern="[A-Za-z0-9ñáéíóúÑÁÉÍÓÚ]{0,10}$"
              patternerror="Ingrese letras o números"
              value={currentData.cp}
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>

        {/* Dirección */}
        <div className="w-full">
          <lumau-input
            small
            id="address"
            label="Dirección"
            name="address"
            placeholder="Diag 74 nro xxxx"
            pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,150}$"
            patternerror="Ingrese letras o números"
            value={currentData.address}
            selectOnFocus
            required
          ></lumau-input>
        </div>

        {/* Provincia / Order */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="province"
              label="Provincia"
              name="province"
              placeholder="Buenos Aires"
              pattern="[A-Za-z0-9 ñáéíóúÑÁÉÍÓÚ]{0,50}$"
              patternerror="Ingrese letras o números"
              value={currentData.province}
              selectOnFocus
              required
            ></lumau-input>
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
              required
            ></lumau-input>
          </div>
        </div>
        {/* lat / lng */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="lat"
              label="Latitud"
              name="lat"
              placeholder="-34.9213703"
              pattern="^[0-9-.]{0,15}$"
              patternerror="Ingrese solo los números"
              value={currentData.lat}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full sm:w-1/2">
            <lumau-input
              small
              id="lng"
              label="Longitud"
              name="lng"
              placeholder="-57.9539642"
              pattern="^[0-9-.]{0,15}$"
              patternerror="Ingrese solo los números"
              value={currentData.lng}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>

        {/* Email / phone */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className=" w-full sm:w-1/2">
            <lumau-input
              small
              id="email"
              label="Email"
              name="email"
              placeholder="johndoe@example.com"
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-ñ]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              patternerror="El email no es válido"
              value={currentData.email}
              selectOnFocus
              required
            ></lumau-input>
          </div>
          <div className=" w-full sm:w-1/2">
            <lumau-input
              small
              id="phone"
              label="Teléfono"
              name="phone"
              placeholder="01199999999"
              pattern="^[0-9()-]{0,50}$"
              patternerror="El teléfono no es válido"
              value={currentData.phone}
              selectOnFocus
              required
            ></lumau-input>
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
  );
};
export default Office;
