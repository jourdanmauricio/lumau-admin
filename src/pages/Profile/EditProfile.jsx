/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

const EditProfile = ({ user, handleSubmit }) => {
  return (
    <>
      <div className="relative py-4">
        <lumau-message
          id="form-error"
          errorForm=""
        ></lumau-message>
      </div>
      <form
        id="edit-profile-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="w-full">
          <lumau-input
            small
            id="name"
            label="Nombre"
            name="name"
            placeholder="John Doe"
            pattern="^[A-Za-z ñáéíóúÑÁÉÍÓÚ]{0,150}$"
            patternerror="El nombre no es válido"
            value={user.name}
            selectOnFocus
            required
          ></lumau-input>
        </div>
        <div className="w-full mt-4">
          <lumau-input
            small
            id="dni"
            label="DNI"
            name="dni"
            placeholder="xxxxxxxx"
            pattern="^[0-9]{0,8}$"
            patternerror="Ingrese solo los números"
            value={user.dni}
            selectOnFocus
            required
          ></lumau-input>
        </div>
        <div className="w-full mt-4">
          <lumau-input
            small
            id="email"
            label="Email"
            name="email"
            placeholder="johndoe@example.com"
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-ñ]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
            patternerror="El email no es válido"
            value={user.email}
            selectOnFocus
            required
          ></lumau-input>
        </div>
        <div className="w-full mt-4">
          <lumau-input
            small
            id="phone"
            label="Teléfono"
            name="phone"
            placeholder="01199999999"
            pattern="^[0-9()-]{0,50}$"
            patternerror="El teléfono no es válido"
            value={user.phone}
            selectOnFocus
            required
          ></lumau-input>
        </div>
        <div className="w-full mt-4">
          <lumau-input
            small
            id="url"
            label="Username (Web)"
            name="url"
            placeholder="https://example.com"
            value={user.url}
            selectOnFocus
            readonly
          ></lumau-input>
          <button
            type="submit"
            className="btn-confirm block ml-auto"
          >
            Modificar
          </button>
        </div>
      </form>
    </>
  );
};
export default EditProfile;
