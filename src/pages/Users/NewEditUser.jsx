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
        {/* User y pass */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className=" w-full sm:w-1/2">
            <lumau-input
              small
              id="url"
              label="Username (Web)"
              name="url"
              placeholder="https://example.com"
              pattern="^(https?://)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
              patternerror="The URL is not valid"
              value={currentData.url}
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="w-full sm:w-1/2">
              <lumau-input
                small
                id="name"
                label="Nombre"
                name="name"
                placeholder="John Doe"
                pattern="^[A-Za-z ñáéíóúÑÁÉÍÓÚ]{0,150}$"
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
          <div className="flex flex-col sm:flex-row gap-4 w-full">
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
          <div className="flex flex-col sm:flex-row gap-4 w-full">
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

          {/* Features */}
          {/* <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className=" w-full sm:w-1/2">
              <label
                className="border-b border-solid border-slate-100 w-full block text-center"
                htmlFor="attributes"
              >
                Características:
              </label>
              <select
                className="w-full bg-[#f1f5f9] dark:bg-[#334155]  p-2 border-none outline-none"
                name="attributes"
                id="attributes"
                multiple
                defaultValue={editData.attributes}
                onChange={(e) => {
                  const options = [...e.target.selectedOptions];
                  const values = options.map((option) => option.value);
                  handleFeatures(values);
                }}
              >
                {attributes.map((attribute) => (
                  <option
                    key={attribute}
                    value={attribute}
                  >
                    {attribute}
                  </option>
                ))}
              </select>
            </div>
            {features && (
              <div className="w-full sm:w-1/2 text-center">
                <button
                  type="button"
                  onClick={() => openModalFeatures()}
                  className="btn-confirm"
                >
                  Cambiar caracteríscas
                </button>
              </div>
            )}
          </div> */}
        </div>

        <div className="flex justify-around items-center mt-8">
          <Features
            attributes={attributes}
            setAttributes={setAttributes}
            menuItems={menuItems}
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
