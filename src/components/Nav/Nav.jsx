import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import {
  FaPowerOff,
  FaRegEdit,
  FaLightbulb,
  FaRegLightbulb,
} from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Modal/Modal';
import Notes from '@/components/Notes/Notes';
import MenuMobile from './MenuMobile';

const Nav = () => {
  const [theme, setTheme] = useState(() => {
    if (!('theme' in localStorage)) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        return 'dark';
      } else {
        document.documentElement.classList.add('light');
        return 'light';
      }
    } else {
      if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
        return 'dark';
      } else {
        document.documentElement.classList.add('light');
        return 'light';
      }
    }
  });
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  let navigate = useNavigate();

  const handleDesign = () => {
    openModal();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMode = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
      <nav className="sticky top-0 h-12 bg-slate-100 dark:bg-slate-950 shadow-[0_0_9px_3px_rgba(41,41,41,0.25)] z-10 py-0 px-6 flex items-center justify-around">
        <MenuMobile />
        <div className="flex w-full justify-center text-gray-900">
          <h1 className="text-2xl font-bold text-violet-900 tracking-tighter">
            lu<span className="text-violet-600 ">mau</span>
          </h1>
        </div>
        <div className="flex items-center">
          <button onClick={handleMode}>
            {theme === 'dark' ? (
              <FaLightbulb className="text-slate-100 text-xl border-none" />
            ) : (
              <FaRegLightbulb className="text-gray-900 text-xl border-none" />
            )}
          </button>
          <button onClick={handleDesign}>
            <FaRegEdit className="text-teal-700 ml-6 text-xl border-none" />
          </button>
          {user && (
            <button
              className="text-red-700 ml-6 text-xl border-none cursor-pointer"
              onClick={handleLogout}
            >
              <FaPowerOff />
            </button>
          )}
        </div>
      </nav>
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

export default Nav;
