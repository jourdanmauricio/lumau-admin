/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';
// import AddPicture from '../../components/AddPicture/AddPicture';

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
        {/* Name / dni */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
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
          <div className="w-full md:w-1/2">
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
        </div>

        {/* Email / phone */}
        <div className="flex flex-col md:flex-row md:gap-8">
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
        </div>

        {/* Usename / Web */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full mt-4">
            <lumau-input
              small
              id="username"
              label="Username"
              name="username"
              placeholder="example.com"
              value={user.username}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full mt-4">
            <lumau-input
              small
              id="url"
              label="Web"
              name="url"
              placeholder="https://example.com"
              value={user.url}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full mt-4">
            <lumau-input
              small
              id="cloudName"
              label="Cloudinary Name"
              name="cloudName"
              placeholder=" "
              value={user.cloudName}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full mt-4">
            <lumau-input
              small
              id="cloudFolder"
              label="Cloudinary Folder"
              name="cloudFolder"
              placeholder=" "
              value={user.cloudFolder}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full mt-4">
            <lumau-input
              small
              id="cloudApiKey"
              label="Cloudinary Api Key"
              name="cloudApiKey"
              placeholder=" "
              value={user.cloudApiKey}
              selectOnFocus
            ></lumau-input>
          </div>

          <div className="w-full mt-4">
            <lumau-input
              small
              id="cloudPreset"
              label="Cloudinary Preset"
              name="cloudPreset"
              placeholder=" "
              value={user.cloudPreset}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>

        {/* image / alt image */}
        {/* <div className="mt-8">
          <AddPicture currentData={user} />
        </div> */}

        <button
          type="submit"
          className="btn-confirm block ml-auto"
        >
          Modificar
        </button>
      </form>
    </>
  );
};
export default EditProfile;
