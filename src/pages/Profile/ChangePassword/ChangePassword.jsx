/* eslint-disable react/prop-types */
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import useChangePassword from './useChangePassword';

const ChangePassword = ({ handleCancel }) => {
  const { handleSubmit } = useChangePassword({ handleCancel });
  return (
    <>
      <h2 className="text-gray-950 mt-2 text-center text-xl font-bold">
        Cambiar password
      </h2>
      <hr className="mt-1" />
      <form
        className="bg-slate-100 p-5 flex flex-col bg-text-color min-h-[320px]"
        onSubmit={handleSubmit}
        noValidate
        id="change-password-form"
      >
        <div className="relative">
          <lumau-message
            id="form-error-change-pass"
            errorForm=""
          ></lumau-message>
        </div>

        <div className="flex-grow">
          <div className="w-full mt-8">
            <lumau-input
              class="lumau-input"
              medium
              controlType="password"
              id="password"
              label="Nueva contraseña"
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

          <div className="w-full mt-8">
            <lumau-input
              class="lumau-input"
              medium
              controlType="password"
              id="confirm-password"
              label="Confirmación de contraseña"
              name="confirmPassword"
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
        </div>

        <button
          className="mt-8 block ml-auto btn-confirm"
          type="submit"
        >
          Cambiar contraseña
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
