import { useState } from 'react';
import { useModal } from '@/hooks/useModal';

const useNewEditUser = ({ currentData }) => {
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  const [attributes, setAttributes] = useState(currentData.attributes);

  const handleCancel = () => {
    closeModalPass();
  };

  return {
    isOpenModalPass,
    openModalPass,
    handleCancel,
    attributes,
    setAttributes,
  };
};
export default useNewEditUser;
