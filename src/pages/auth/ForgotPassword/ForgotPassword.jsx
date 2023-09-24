// import { useState } from 'react';
// import Spinner from '@/components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { config } from '@/config/config';
import checkForm from '@/utils/checkForm';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';
import '@/components/lumau-spinner.js';

const ForgotPassword = () => {
  const dispatchNotif = useNotification();

  const URL = `${config.endpoints}/auth/recovery`;

  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = checkForm(e);
    if (!data) return;

    try {
      // loading.setAttribute('loading', true);
      const options = {
        method: 'POST',
        body: JSON.stringify({ username: data.username }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(URL, options);
      const resRecovery = await response.json();
      if (resRecovery.statusCode) throw resRecovery;
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Email enviado',
      });
      const formError = document.getElementById('form-error');
      formError.setAttribute('errorForm', 'Email enviado!');
    } catch (error) {
      const formError = document.getElementById('form-error');
      formError.setAttribute('errorForm', 'Error recuperando el usuario');
    }
  }

  return (
    <main className="inline-block h-screen w-full bg-slate-900">
      <form
        id="form-forgot"
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
          Bienvedido!!!
        </label>

        {/* disabled readonly selectOnFocus  */}
        <div className="w-full mt-4">
          <lumau-input
            class="login__input"
            id="username"
            label="Username"
            name="username"
            placeholder="example@mail.com"
            pattern="[A-Z0-9a-zñáéíóúÑÁÉÍÓÚ]$"
            patternerror="The username is not valid"
            selectOnFocus
            required
          ></lumau-input>
        </div>

        {/* disabled={messageOk} */}
        <div className="mt-8">
          <p>Te enviaremos un email para realizar el cambio de contraseña</p>
        </div>
        <button
          className="mt-8 py-2.5 px-4 text-base bg-purple-800 w-full border-none rounded text-white transition ease-in-out delay-100 hover:bg-purple-900 hover:cursor-pointer"
          type="submit"
        >
          Recuperar password
        </button>

        <Link
          to="/"
          className="block no-underline mt-10 w-fit ml-auto text-sm text-slate-300 hover:underline"
        >
          Posee una cuenta? Login
        </Link>
      </form>
    </main>
  );
};

export default ForgotPassword;
