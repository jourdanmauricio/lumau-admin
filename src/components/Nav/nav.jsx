import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '@/store/user';
import {
  FaGlobe,
  FaQuestionCircle,
  FaStore,
  FaUserCog,
  FaCog,
  FaRegCalendarAlt,
  FaUsers,
  FaTh,
  FaPowerOff,
  FaBars,
  FaBoxOpen,
  FaRegEdit,
} from 'react-icons/fa';
import { logOutSettings } from '@/store/settings';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Notes from '@/components/Notes/Notes';

const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  const [isOpenModal, openModal, closeModal] = useModal(false);
  let [page, setPage] = useState([]);
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleDesign = () => {
    openModal();
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(logOutSettings());
    navigate('/');
  };

  useEffect(() => {
    switch (true) {
      case location.pathname.includes('/settings'):
        setPage([
          {
            id: 0,
            title: 'Productos',
            icon: FaBoxOpen,
            to: '/settings/SettingsProducts',
          },
          {
            id: 1,
            title: 'Preguntas',
            icon: FaQuestionCircle,
            to: '/settings/SettingsQuestions',
          },
          { id: 2, title: 'Web', icon: FaGlobe, to: '/settings/settingsWeb' },
          {
            id: 3,
            title: 'Ml',
            icon: FaStore,
            to: '/settings/settingsMl',
          },
        ]);
        break;
      default:
        setPage([]);
    }
  }, [location]);

  return (
    <>
      <nav className="sticky top-0 h-12 bg-slate-100 shadow-[0_0_9px_3px_rgba(41,41,41,0.25)] z-10 py-0 px-6 flex items-center justify-around">
        <div className="sm:hidden">
          <FaBars className="text-2xl" onClick={handleMobileMenu} />
        </div>
        <div className="flex w-full justify-center">
          <span>Laura Rodriguez</span>
          {/* <ul className="navbar__items">
            {page.map((e) => (
              <li className="navbar__item" key={e.id}>
                <NavLink
                  to={e.to}
                  className={({ isActive }) => (isActive ? 'nav__active' : '')}
                >
                  <button className="btn btn__primary">
                    <span>
                      <e.icon className="material__icon" />
                    </span>
                    <span className="icon__text">{e.title}</span>
                  </button>
                </NavLink>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="flex items-center">
          <button onClick={handleDesign}>
            <FaRegEdit className="text-teal-700 text-2xl border-none" />
          </button>

          {user && (
            <button
              className="text-red-700 ml-6 text-2xl border-none cursor-pointer"
              onClick={handleLogout}
            >
              <FaPowerOff />
            </button>
          )}
        </div>
        {/* </div> */}
        <div
          className={`absolute top-[53px] left-0 w-[60%] bg-slate-100 ${
            mobileMenu && 'hidden'
          }`}
        >
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
              >
                <FaUserCog className="mr-4 inline-block" />
                <span className="align-middle">Perfil</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
              >
                <FaTh className="mr-4 inline-block" />
                <span className="align-middle">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
              >
                <FaCog className="mr-4 inline-block" />
                <span className="align-middle">Configuración</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
                to="/categories"
              >
                <FaRegCalendarAlt className="mr-4 inline-block" />
                <span className="align-middle">Categorías</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
              >
                <FaBoxOpen className="mr-4 inline-block" />
                <span className="align-middle">Productos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:bg-slate-500 ${
                    isActive ? 'bg-slate-500' : 'bg-slate-100'
                  }  `
                }
              >
                <FaUsers className="mr-4 inline-block" />
                <span className="align-middle">Usuarios</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {isOpenModal && (
        <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
          <Notes />
        </Modal>
      )}
    </>
  );
};

export default Nav;
