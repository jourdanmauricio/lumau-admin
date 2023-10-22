import { Modal } from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { actions } from '@/config/variables';
import ModalActions from './ModalActions';
import { useProdLibsStore } from '@/store/prodLib';

const SelectActions = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { setMassiveAction, massiveAction, setMassiveValue } =
    useProdLibsStore();

  const handleAction = (action) => {
    setMassiveAction({ action });
    if (action === 'changePrice') setMassiveValue({ value: '0' });
    openModal();
  };

  const handleCancelDelete = () => {
    setMassiveAction({ action: '' });
    closeModal();
  };

  return (
    <>
      <div className="w-full">
        <select
          className="input-form h-8"
          value={massiveAction}
          onChange={(e) => handleAction(e.target.value)}
        >
          <option value=""></option>

          {actions.map((action) => (
            <option
              key={action.id}
              value={action.id}
            >
              {action.value}
            </option>
          ))}
        </select>
      </div>
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={handleCancelDelete}
        >
          <ModalActions
            handleCancelDelete={handleCancelDelete}
            // handleDelete={handleDelete}
          />
        </Modal>
      )}
    </>
  );
};
export default SelectActions;
