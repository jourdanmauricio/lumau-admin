import { Link } from 'react-router-dom';
import useLogin from './useLogin';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import '@/components/lumau-input.js';
import '@/components/lumau-message.js';
// import '@/components/lumau-spinner.js';

const Login = () => {
  const { handleSubmit } = useLogin();

  return (
    <main className="inline-block h-screen w-full bg-slate-900">
      {/* animation */}
      <form
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
        {/* <lumau-spinner id="lumau-spinner"></lumau-spinner> */}

        <label className="text-white text-2xl mt-4 font-medium">
          Bienvedido!!!
        </label>

        {/* disabled readonly selectOnFocus  */}
        <div className="w-full mt-4">
          <lumau-input
            class="login__input"
            id="url"
            label="User (web)"
            name="url"
            placeholder="https://example.com.ar"
            pattern="^(https?://)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
            patternerror="The URL is not valid"
            selectOnFocus
            required
          ></lumau-input>
        </div>

        <div className="w-full mt-8">
          <lumau-input
            class="login__input"
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

        <button
          className="mt-8 py-2.5 px-4 text-base bg-purple-800 w-full border-none rounded text-white transition ease-in-out delay-100 hover:bg-purple-900 hover:cursor-pointer"
          type="submit"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          className="block no-underline mt-10 w-fit ml-auto text-sm text-slate-300 hover:underline"
        >
          Olvidó su contraseña?
        </Link>
      </form>
    </main>
  );
};

export default Login;
