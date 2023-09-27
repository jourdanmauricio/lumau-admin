import { useNotification } from '@/components/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/store/user';
import checkForm from '@/utils/checkForm';
import { useState } from 'react';

const useProfile = () => {
  let user = useUserStore((state) => state.user);
  let updateUser = useUserStore((state) => state.updateUser);
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  const dispatchNotif = useNotification();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleSubmit = async (e) => {
    const { data } = checkForm(e);

    if (!data) return;

    data.id = user.id;
    const formError = document.getElementById('form-error');
    const loading = document.getElementById('lumau-spinner');

    try {
      loading.setAttribute('loading', true);
      const user = await updateUser(data);

      dispatchNotif({
        type: user.status,
        message: user.message,
      });
      formError.removeAttribute('errorForm');
    } catch (error) {
      let message = 'Error  modificando';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      formError.setAttribute('errorForm', message);
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
    toggleState,
    toggleTab,
  };
};
export default useProfile;
