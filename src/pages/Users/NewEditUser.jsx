/* eslint-disable react/prop-types */
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import ChangePassword from '../Profile/ChangePassword/ChangePassword';
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

import Features from './Features';
import useNewEditUser from './useNewEditUser';

const NewEditUser = ({
  onSubmit,
  action,
  onCancelDelete,
  currentData,
  menuItems,
}) => {
  const {
    isOpenModalPass,
    openModalPass,
    handleCancel,
    attributes,
    setAttributes,
    // menuItems,
  } = useNewEditUser({ currentData });

  return (
    <>
      <h2 className="bg-text-color">
        {action === 'NEW' && 'Nuevo usuario'}
        {action === 'EDIT' && 'Editar usuario'}
        {action === 'DETAIL' && 'Detalle de usuario'}
      </h2>
      <hr className="mt-1" />

      <form
        id="users-form"
        className="mt-4"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="flex flex-col gap-4">
          {/* User y pass */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full justify-center items-center">
            <div className=" w-full sm:w-1/2">
              <lumau-input
                small
                id="username"
                label="Username"
                name="username"
                placeholder="example.com"
                pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]$"
                patternerror="The username is not valid"
                value={currentData.username}
                selectOnFocus
              ></lumau-input>
            </div>
            {action === 'NEW' ? (
              <div className=" w-full sm:w-1/2">
                <lumau-input
                  small
                  controlType="password"
                  id="password"
                  label="Password"
                  name="password"
                  placeholder="********"
                  pattern="^.{8,255}$"
                  patternerror="Must contain at least 8 chars"
                  required
                  togglePassword
                >
                  <span slot="show-password-icon">
                    <FaEye />
                  </span>
                  <span slot="hide-password-icon">
                    <FaEyeSlash />
                  </span>
                </lumau-input>
              </div>
            ) : (
              <div className=" w-full sm:w-1/2 text-center">
                <button
                  type="button"
                  onClick={() => openModalPass()}
                  className="btn-confirm"
                >
                  Cambiar contraseña
                </button>
              </div>
            )}
          </div>

          {/* Nombre / DNI */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full">
            <div className="w-full sm:w-1/2">
              <lumau-input
                small
                id="name"
                label="Nombre"
                name="name"
                placeholder="John Doe"
                pattern="[A-Za-z ñáéíóúÑÁÉÍÓÚ]{0,150}$"
                patternerror="El nombre no es válido"
                value={currentData.name}
                selectOnFocus
                required
              ></lumau-input>
            </div>
            <div className="w-full sm:w-1/2">
              <lumau-input
                small
                id="dni"
                label="DNI"
                name="dni"
                placeholder="xxxxxxxx"
                pattern="^[0-9]{0,8}$"
                patternerror="Ingrese solo los números"
                value={currentData.dni}
                selectOnFocus
                required
              ></lumau-input>
            </div>
          </div>

          {/* Email / phone */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full">
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

          {/* Deploy / Role */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full">
            <div className=" w-full sm:w-1/2">
              <lumau-input
                small
                id="deploy"
                label="Deploy"
                name="deploy"
                placeholder="Git Hub Pages"
                pattern="^[A-Za-z ñáéíóúÑÁÉÍÓÚ]{0,150}$"
                patternerror="El servidor no es válido"
                value={currentData.deploy}
                selectOnFocus
                required
              ></lumau-input>
            </div>
            <div className="w-full sm:w-1/2">
              <lumau-input
                small
                id="role"
                label="Role"
                name="role"
                value={currentData.role === 'admin' ? 'admin' : 'user'}
                selectOnFocus
                readonly
              ></lumau-input>
            </div>
          </div>

          {/* web */}
          <div className="w-full">
            <lumau-input
              small
              id="repo"
              label="Repositorio Github"
              name="repo"
              placeholder="blackwing-astro"
              value={currentData.repo}
              selectOnFocus
            ></lumau-input>
          </div>

          {/* web */}
          <div className="w-full">
            <lumau-input
              small
              id="url"
              label="Web"
              name="url"
              placeholder="https://example.com"
              value={currentData.url}
              selectOnFocus
            ></lumau-input>
          </div>

          {/* cloudname / cloudfolder */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="w-full">
              <lumau-input
                small
                id="cloudName"
                label="Cloudinary Name"
                name="cloudName"
                placeholder=" "
                value={currentData.cloudName}
                selectOnFocus
              ></lumau-input>
            </div>
            <div className="w-full">
              <lumau-input
                small
                id="cloudFolder"
                label="Cloudinary Folder"
                name="cloudFolder"
                placeholder=" "
                value={currentData.cloudFolder}
                selectOnFocus
              ></lumau-input>
            </div>
          </div>

          {/* cloud Api key / Cloud preset */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="w-full">
              <lumau-input
                small
                id="cloudApiKey"
                label="Cloudinary Api Key"
                name="cloudApiKey"
                placeholder=" "
                value={currentData.cloudApiKey}
                selectOnFocus
              ></lumau-input>
            </div>

            <div className="w-full">
              <lumau-input
                small
                id="cloudPreset"
                label="Cloudinary Preset"
                name="cloudPreset"
                placeholder=" "
                value={currentData.cloudPreset}
                selectOnFocus
              ></lumau-input>
            </div>
          </div>

          {/* Attributes   */}
          <div className="flex justify-around items-center mt-8">
            <Features
              attributes={attributes}
              setAttributes={setAttributes}
              menuItems={menuItems}
            />
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

        <input
          type="hidden"
          id="attributes"
          name="attributes"
          data-custom={attributes}
        ></input>
      </form>

      <Modal
        width="md"
        isOpenModal={isOpenModalPass}
        closeModal={handleCancel}
      >
        <ChangePassword
          handleCancel={handleCancel}
          userId={currentData.id}
        />
      </Modal>
    </>
  );
};
export default NewEditUser;
