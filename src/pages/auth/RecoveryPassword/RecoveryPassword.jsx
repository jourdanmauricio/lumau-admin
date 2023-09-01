import { useState } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useLocation, useNavigate } from 'react-router-dom';
// import { variables } from '@/config/variables';

const RecoveryPassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassShown, setNewPassShown] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [newPassError, setNewPassError] = useState(null);
  const [confPassShown, setConfPassShown] = useState(false);
  const [confPass, setConfPass] = useState('');
  const [confPassError, setConfPassError] = useState(null);
  const dispatchNotif = useNotification();
  let navigate = useNavigate();

  // const URL = `${variables.basePath}/auth/change-password`;
  let { search } = useLocation();
  const params = new URLSearchParams(search);

  const token = params.get('token');

  function handleChange(name, value) {
    if (name === 'newPass') {
      setNewPass(value);
      if (value.length < 8) {
        setNewPassError('Mínimo 8 caracteres');
        return;
      }
      setNewPassError(null);
    }
    if (name === 'confPass') {
      setConfPass(value);
      if (value !== newPass) {
        setConfPassError('La contraseña no coincide');
        return;
      }
      setConfPassError(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ token, password: confPass }),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center h-screen w-full bg-slate-900">
      {loading && <Spinner />}
      <form
        className="text-center mt-24 h-max pt-12 px-10 pb-5 max-w[320px] bg-slate-800 rounded border border-gray-700 animation"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="text-white text-2xl text-center font-medium">
          Cambio de contraseña
        </label>
        {/* <p className={styles.formMsg__forgot}>
					<p
						className={`${styles.form__msg} ${
							messageOk && styles.form__success
						} ${messageErr && styles.form__error}`}>
						{messageErr}
						{messageOk}
					</p>
				</p> */}

        <div className="relative py-4 px-0 text-left">
          <label className="block font-normal text-slate-300">
            Nueva contraseña
          </label>
          <i
            className="absolute right-0 p-4 min-w-[40px] text-slate-300"
            onClick={() => setNewPassShown(!newPassShown)}
          >
            {newPassShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`mt-0.5 py-2.5 px-2 w-full text-base border border-solid bg-slate-700 text-gray-300 rounded outline-none ${
              !newPassError ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type={newPassShown ? 'text' : 'password'}
            id="new-pass"
            name="newPass"
            placeholder="Ingrese la nueva contraseña"
          />

          <p
            className={`absolute block pt-[3px] text-xs text-red-500 transition-opacity duration-1000 ease-in-out ${
              newPassError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {newPassError}
          </p>
        </div>

        <div className="relative py-4 px-0 text-left">
          <label className="block font-normal text-slate-300">
            Confirmación contraseña
          </label>
          <i
            className="absolute right-0 p-4 min-w-[40px] text-slate-300"
            onClick={() => setConfPassShown(!confPassShown)}
          >
            {confPassShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`mt-0.5 py-2.5 px-2 w-full text-base border border-solid bg-slate-700 text-gray-300 rounded outline-none ${
              !confPassError ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type={confPassShown ? 'text' : 'password'}
            id="conf-pass"
            name="confPass"
            placeholder="Confirmación de contraseña"
          />
          <p
            className={`absolute block pt-[3px] text-xs text-red-500 transition-opacity duration-1000 ease-in-out ${
              confPassError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {confPassError}
          </p>
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
