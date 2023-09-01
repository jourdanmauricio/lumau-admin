// import { useState } from 'react';
// import Spinner from '@/components/Spinner/Spinner';
import { Link } from 'react-router-dom';
// import { variables } from '@/config/variables';
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';
import '@/components/lumau-spinner.js';

const ForgotPassword = () => {
  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [emailError, setEmailError] = useState(null);
  // const [messageOk, setMessageOk] = useState(null);
  // const [messageErr, setMessageErr] = useState(null);

  // const URL = `${variables.basePath}/auth/recovery`;

  // function handleChange(name, value) {
  // if (name === 'email') {
  //   const pattern =
  //     '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';
  //   setEmail(value);
  //   let regex = new RegExp(pattern);
  //   regex.exec(value) === null
  //     ? setEmailError('Ingresa un email válido')
  //     : setEmailError(null);
  // }
  //   console.log(name, value);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    // setMessageErr(null);

    // let error = false;
    // if (email.length === 0) {
    //   setEmailError('Obligatorio');
    //   error = true;
    // }

    // if (error || emailError !== null) return;

    // setLoading(true);
    // try {
    //   const options = {
    //     method: 'POST',
    //     body: JSON.stringify({ email }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };
    //   const response = await fetch(URL, options);
    //   const resRecovery = await response.json();
    //   if (resRecovery.statusCode) throw resRecovery;
    //   setMessageOk(
    //     'Email enviado!. Sigue las instrucciones para generar la contraseña.'
    //   );
    // } catch (error) {
    //   setMessageErr('Verifique la dirección de email');
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <main className="inline-block h-screen w-full bg-slate-900">
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

        <lumau-spinner id="lumau-spinner"></lumau-spinner>

        <label className="text-white text-2xl mt-4 font-medium">
          Bienvedido!!!
        </label>

        {/* disabled readonly selectOnFocus  */}
        <div className="w-full mt-4">
          <lumau-input
            class="login__input"
            id="email"
            label="Email"
            name="email"
            placeholder="example@mail.com"
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            patternerror="The Email is not valid"
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
          Cambiar password
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
