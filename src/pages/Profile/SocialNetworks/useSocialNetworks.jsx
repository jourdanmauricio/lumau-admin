/* eslint-disable react/prop-types */
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

import { useEffect, useState } from 'react';
import checkForm from '@/utils/checkForm';
import {
  getNetworks,
  updateNetwork,
} from '../../../services/api/socialNetworks.api';
import { useUserStore } from '../../../store/user';
import { useNotification } from '../../../components/Notifications/NotificationProvider';

const useSocialNetworks = () => {
  const [networks, setNetworks] = useState([]);
  const user = useUserStore((state) => state.user);
  const dispatchNotif = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNetworks(user);
      console.log('DATA', data);
      setNetworks(data[0]);
    };
    fetchData();
  }, [user]);
  const handleSubmit = async (e) => {
    const { data } = checkForm(e);
    if (!data) return;

    data.id = user.id;
    const formError = document.getElementById('networks-form-error');

    try {
      await updateNetwork(data);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Redes modificadas',
      });
      formError.removeAttribute('errorForm');
    } catch (error) {
      let message = 'Error  modificando las redes';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      formError.setAttribute('errorForm', message);
    } finally {
      //loading.removeAttribute('loading');
    }
  };

  return { handleSubmit, networks };
};
export default useSocialNetworks;
