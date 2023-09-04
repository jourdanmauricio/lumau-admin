import { updateUser } from '@/services/api/users.api';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import checkForm from '@/utils/checkForm';

const useChangePassword = ({ handleCancel, userId }) => {
  const dispatchNotif = useNotification();

  const handleSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    try {
      data.id = userId;
      delete data.confirmPassword;

      await updateUser(data);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contraseña modificada',
      });
      handleCancel();
    } catch (error) {
      let message = 'Error  modificando la contraseña';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      const formError = document.getElementById('form-error-change-pass');
      formError.setAttribute('errorForm', message);
    }
  };

  return { handleSubmit };
};
export default useChangePassword;
