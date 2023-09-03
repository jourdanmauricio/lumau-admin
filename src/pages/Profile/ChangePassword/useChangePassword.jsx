import { putUser } from '@/services/api/users.api';
import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useUserStore } from '@/store/user';
import checkForm from '@/utils/checkForm';

const useChangePassword = ({ handleCancel }) => {
  const dispatchNotif = useNotification();
  let user = useUserStore((state) => state.user);

  const handleSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    try {
      data.id = user.id;
      delete data.confirmPassword;

      await putUser(data);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contraseña modificada',
      });
      handleCancel();
    } catch (error) {
      const formError = document.getElementById('form-error-change-pass');
      formError.setAttribute('errorForm', 'Error modificando la contraseña');
    }
  };

  return { handleSubmit };
};
export default useChangePassword;
