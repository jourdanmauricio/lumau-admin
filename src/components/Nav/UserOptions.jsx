import {
  FaChevronDown,
  FaLightbulb,
  FaPowerOff,
  FaRegEdit,
  FaRegLightbulb,
  FaUserCog,
} from 'react-icons/fa';
import { useUserStore } from '../../store/user';
import { createRef, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';
import Notes from '../Notes/Notes';

const menu = [
  { id: 1, label: 'Perfil', route: '/profile', icon: FaUserCog },
  // { label: 'Settings', route: '/admin/products' },
];

const UserOptions = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setTheme = useUserStore((state) => state.setTheme);
  const theme = useUserStore((state) => state.theme);
  const navigate = useNavigate();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const personalMenuRef = createRef();

  useEffect(() => {
    const closeMenu = (e) => {
      if (!personalMenuRef.current?.contains(e.target)) setShowOptions(false);
    };

    document.body.addEventListener('click', closeMenu);

    return () => document.body.removeEventListener('click', closeMenu);
  }, [personalMenuRef]);

  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    console.log('Click');
    setShowOptions(!showOptions);
  };

  const handleNote = () => {
    openModal();
    setShowOptions(false);
  };
  const handleNavigate = (route) => {
    setShowOptions(false);
    navigate(route);
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
    setShowOptions(false);
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
      <div
        ref={personalMenuRef}
        onClick={handleClick}
        className="flex gap-4 text-text-color dark:text-dark-text-color bg-transparent items-center cursor-pointer p-2"
      >
        <span className="text-text-color dark:text-dark-text-color text-lg font-medium">
          {user.username}
        </span>
        <FaChevronDown className="border-none" />
      </div>

      <div
        className={`${
          showOptions ? 'block' : 'hidden'
        } absolute w-fit top-[50px] right-8 z-10 bg-text-color divide-y shadow-xl dark:shadow-lg dark:shadow-gray-700/50 divide-slate-200 dark:divide-slate-600`}
      >
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavigate(item.route)}
            >
              <span
                // to={item.route}
                className="flex items-center justify-center py-2 px-4 gap-4 cursor-pointer"
              >
                <item.icon className="text-orange-400 text-xl border-none" />
                <span className="block w-full text-sm  hover:text-gray-900 dark:hover:text-white">
                  {item.label}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div
          onClick={handleNote}
          className="flex items-center justify-center py-2 px-4 gap-4 cursor-pointer"
        >
          <FaRegEdit className="text-teal-700 text-xl border-none" />
          <span className="block w-full text-sm  hover:text-gray-900 dark:hover:text-white">
            Notas
          </span>
        </div>

        <div
          onClick={handleMode}
          className="flex items-center justify-center py-2 px-4 gap-4 cursor-pointer"
        >
          {theme === 'dark' ? (
            <FaLightbulb className="text-slate-100 border-none" />
          ) : (
            <FaRegLightbulb className="text-gray-900 border-none" />
          )}

          <span className="block w-full text-sm hover:text-gray-900 dark:hover:text-white">
            {theme === 'dark' ? 'Ligth Mode' : 'Dark Mode'}
          </span>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-center py-2 px-4 gap-4 cursor-pointer"
        >
          <FaPowerOff className="text-red-700 text-xl border-none" />
          <span className="block w-full text-sm  hover:text-gray-900 dark:hover:text-white">
            Logout
          </span>
        </div>
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
export default UserOptions;
