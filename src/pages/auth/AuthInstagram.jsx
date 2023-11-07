import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authInstagram } from '@/services/api/auth.api';

const AuthInstagram = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // post -> change code for token. Lo realizamos en backend para no exponer el secret.
  // en local POST =>   auth/auth-instagram con code en body,

  const changeCodeForToken = async () => {
    console.log('CODE!!!!', code, state);
    const response = await authInstagram(code, state);
    console.log('response', response);
  };

  useEffect(() => {
    changeCodeForToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, state]);

  // console.log('Res', response);

  return (
    <div>
      Estamos redirigiendo tu solicitud a Instagram
      <p>Code: {code}</p>
      <p>State: {state}</p>
    </div>
  );
};
export default AuthInstagram;
