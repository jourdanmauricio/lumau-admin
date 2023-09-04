import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Modal/Modal';
import Notes from '@/components/Notes/Notes';

import {
  FaPowerOff,
  FaRegEdit,
  FaLightbulb,
  FaRegLightbulb,
} from 'react-icons/fa';

const NavControls = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setTheme = useUserStore((state) => state.setTheme);
  const theme = useUserStore((state) => state.theme);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  let navigate = useNavigate();

  const handleNote = () => {
    openModal();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMode = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  if (theme) {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.add('light');
  } else {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.add('light');
      setTheme('light');
    }
  }

  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        <div
          onClick={handleMode}
          className="btn-icon"
        >
          {theme === 'dark' ? (
            <FaLightbulb className="text-slate-100 text-xl border-none" />
          ) : (
            <FaRegLightbulb className="text-gray-900 text-xl border-none" />
          )}
        </div>
        <div
          onClick={handleNote}
          className="btn-icon"
        >
          <FaRegEdit className="text-teal-700 text-xl border-none" />
        </div>
        {user && (
          <div
            onClick={handleLogout}
            className="btn-icon"
          >
            <FaPowerOff className="text-red-700 text-xl border-none" />
          </div>
        )}
      </div>

      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={closeModal}
        >
          <Notes />
        </Modal>
      )}
    </>
  );
};
export default NavControls;
