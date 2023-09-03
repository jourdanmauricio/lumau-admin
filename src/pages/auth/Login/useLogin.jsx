import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import checkForm from '@/utils/checkForm';

const useLogin = () => {
  const dispatchNotif = useNotification();
  const login = useUserStore((state) => state.login);
  const isLogged = useUserStore((state) => state.isLogged);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogged === true) navigate('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  async function handleSubmit(e) {
    const { data } = checkForm(e);
    if (!data) return;

    // const loading = document.getElementById('lumau-spinner');

    try {
      // loading.setAttribute('loading', true);
      const user = await login(data);

      dispatchNotif({
        type: user.status,
        message: user.message,
      });
    } catch (error) {
      const formError = document.getElementById('form-error');
      formError.setAttribute('errorForm', error);
    } finally {
      // loading.removeAttribute('loading');
    }
  }

  return {
    handleSubmit,
  };
};

export default useLogin;
