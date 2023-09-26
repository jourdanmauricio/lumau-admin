// import Spinner from '@/components/Spinner/Spinner';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { config } from '@/config/config';
import { useLocation, useNavigate } from 'react-router-dom';
import checkForm from '@/utils/checkForm';

const RecoveryPassword = () => {
  const dispatchNotif = useNotification();
  let navigate = useNavigate();

  const URL = `${config.endpoints}/auth/change-password`;

  let { search } = useLocation();
  const params = new URLSearchParams(search);

  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = checkForm(e);
    if (!data) return;

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ token, password: data.confirmPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(URL, options);
      const resRecovery = await response.json();
      if (resRecovery.statusCode) throw resRecovery;
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contraseña modificada',
      });
      navigate('/');
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: 'Error modificando la contraseña',
      });
    }
  };

  return (
    <main className="inline-block h-screen w-full bg-slate-900">
      <form
        id="form-change-pass"
        className="flex flex-col max-w-md mt-24 m-auto px-8 pb-4 pt-2 text-center bg-slate-800 rounded border border-gray-700"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="relative">
          <lumau-message
            id="form-error"
            errorForm=""
          ></lumau-message>
        </div>

        <lumau-spinner id="lumau-spinner"></lumau-spinner>

        <label className="text-white text-2xl mt-4 font-medium">
          Cambiar contraseña
        </label>

        {/* disabled readonly selectOnFocus  */}
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
          className="mt-8 py-2.5 px-4 text-base bg-purple-800 w-full border-none rounded text-white transition ease-in-out delay-100 hover:bg-purple-900 hover:cursor-pointer"
          type="submit"
        >
          Cambiar password
        </button>
      </form>
    </main>
  );
};

export default RecoveryPassword;
