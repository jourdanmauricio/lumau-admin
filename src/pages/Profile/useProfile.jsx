import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/store/user';
import checkForm from '@/utils/checkForm';

const useProfile = () => {
  let user = useUserStore((state) => state.user);
  let updateUser = useUserStore((state) => state.updateUser);
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  const dispatchNotif = useNotification();

  const handleSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    data.id = user.id;
    const formError = document.getElementById('form-error');
    const loading = document.getElementById('lumau-spinner');

    console.log('Data', data);
    try {
      loading.setAttribute('loading', true);
      const user = await updateUser(data);

      dispatchNotif({
        type: user.status,
        message: user.message,
      });
      formError.removeAttribute('errorForm');
    } catch (error) {
      formError.setAttribute('errorForm', error);
    } finally {
      loading.removeAttribute('loading');
    }
  };

  const handleCancel = () => {
    closeModalPass();
  };

  return {
    user,
    handleSubmit,
    isOpenModalPass,
    openModalPass,
    closeModalPass,
    handleCancel,
  };
};
export default useProfile;
