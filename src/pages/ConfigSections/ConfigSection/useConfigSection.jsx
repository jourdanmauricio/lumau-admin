import checkForm from '@/utils/checkForm';
import { useSectionsStore } from '@/store/sections';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/components/Notifications/NotificationProvider';

const useConfigSection = () => {
  const { handleAddSection, handleUpdSection, error, currentData, action } =
    useSectionsStore();
  const dispatchNotif = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = checkForm(e);

    data.roles = data.roles.split(',');
    data.roles = data.roles.map((role) => role.trim());
    console.log('data.id');
    if (action === 'NEW') {
      await handleAddSection(data);
    } else {
      data.id = currentData.id;
      await handleUpdSection(data);
    }
    if (error) return;
    dispatchNotif({
      type: 'SUCCESS',
      message: `Sección ${action === 'NEW' ? 'creada' : 'modificada'} `,
    });
    navigate('/config-sections');
  };
  return { handleSubmit, error, currentData, action };
};
export default useConfigSection;
