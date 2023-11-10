import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authInstagram } from '@/services/api/instagrams.api';
import { importInstagram } from '../../services/api/instagrams.api';
// import { updateUser } from '../../services/api/users.api';

const AuthInstagram = () => {
  const [auth, setAuth] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [devMode, setDevMode] = useState(false);
  // const [newToken, setNewToken] = useState('');

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // post -> change code for token. Lo realizamos en backend para no exponer el secret.
  // en local POST =>   auth/auth-instagram con code en body,

  const changeCodeForToken = async () => {
    const response = await authInstagram({ code, state });
    if (response.data.status === 'success') setAuth(true);
  };

  useEffect(() => {
    changeCodeForToken();

    // if (!import.meta.env.MODE || import.meta.env.MODE === 'development')
    //  setDevMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, state]);

  const handleImport = async () => {
    const newPosts = await importInstagram();
    console.log('newPosts', newPosts);
    navigate('/sections/instagram');
  };

  // const handleToken = async () => {
  //   console.log('change', newToken);
  //   // upd User => {instagramToken:newToken}

  //   try {
  //     const user = await updateUser({ id: state, instagramToken: newToken });
  //     console.log('Token actualizado', user);
  //   } catch (error) {
  //     console.log('Error actualizando token', error);
  //   }
  // };

  return (
    <div>
      {!auth && (
        <span className="text-xl">
          Estamos procesando la autorización en Instagram...
        </span>
      )}

      {/* {devMode && (
        <div className="flex flex-col gap-2 border p-2 rounded mt-4">
          <label htmlFor="token">New Token</label>
          <input
            type="text"
            name="token"
            id="token"
            onChange={(e) => setNewToken(e.target.value)}
          />
          <button
            className="btn-confirm"
            onClick={handleToken}
          >
            Upd token Development
          </button>
        </div>
      )} */}

      {/* {(auth || devMode) && ( */}
      {auth && (
        <button
          onClick={handleImport}
          className="btn-confirm mt-8"
        >
          Importar Publicaciones
        </button>
      )}
    </div>
  );
};
export default AuthInstagram;
