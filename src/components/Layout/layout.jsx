/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { NavLink } from 'react-router-dom';
import {
  FaCog,
  FaAngleLeft,
  FaAngleRight,
  FaTh,
  FaUserCog,
  // FaRegImages,
  FaComment,
  FaThList,
  FaUsers,
  FaTelegramPlane,
} from 'react-icons/fa';
import '@/components/lumau-spinner.js';

import Nav from '../Nav/Nav';

const Layout = (props) => {
  const user = useUserStore((state) => state.user);

  const [minItems, setMinItems] = useState(false);

  const handleMinItems = () => {
    setMinItems(!minItems);
  };
  return (
    <div className="grid min-h-screen grid-layout">
      <Nav />
      <main className="flex w-full">
        <div
          className={`hidden sm:inline-block h-full left-0 bg-slate-100 dark:bg-slate-950 overflow-x-hidden whitespace-nowrap transition-width text-gray-900 dark:text-slate-100
          ${minItems ? 'w-52' : 'w-12'}
					`}
        >
          <button
            onClick={handleMinItems}
            className="py-4 w-full hover:text-purple-500 text-xl"
          >
            {minItems ? (
              <FaAngleLeft className="m-auto" />
            ) : (
              <FaAngleRight className="m-auto" />
            )}
          </button>

          <hr className="mb-4" />

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              ` py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
          >
            <FaUserCog className="mr-4 inline-block" />
            <span className="align-middle">Perfil</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
          >
            <FaTh className="mr-4 inline-block" />
            <span className="align-middle">Dashboard</span>
          </NavLink>

          {user.role === 'admin' && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                  isActive ? 'text-purple-700' : ''
                } `
              }
            >
              <FaUsers className="mr-4 inline-block" />
              <span className="align-middle">Usuarios</span>
            </NavLink>
          )}

          <NavLink
            className={({ isActive }) =>
              `py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
            to="/subscribers"
          >
            <FaTelegramPlane className="mr-4 inline-block" />
            <span className="align-middle">Suscriptores</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
            to="/contacts"
          >
            <FaComment className="mr-4 inline-block" />
            <span className="align-middle">Contactos</span>
          </NavLink>

          {/* <NavLink
            className={({ isActive }) =>
              `py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
            to="/media"
          >
            <FaRegImages className="mr-4 inline-block" />
            <span className="align-middle">Media</span>
          </NavLink> */}

          {user.role === 'superadmin' && (
            <>
              <NavLink
                to="/configuracion"
                className={({ isActive }) =>
                  `py-4 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
                  } `
                }
              >
                <FaCog className="mr-4 inline-block text-gray-900" />
                <span className="align-middle">Configuración</span>
              </NavLink>
            </>
          )}

          {user.role === 'superadmin' && (
            <NavLink
              to="/secciones"
              className={({ isActive }) =>
                `py-4 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                  isActive ? 'text-purple-700' : ''
                } `
              }
            >
              <FaThList className="mr-4 inline-block text-gray-900" />
              <span className="align-middle">Secciones</span>
            </NavLink>
          )}
        </div>

        <section
          className={`w-full ml-0 py-4 px-4 transform transition duration-500 ease-in-out border-l border-solid border-slate-300 dark:border-slate-700 bg-text-color`}
        >
          <lumau-spinner id="lumau-spinner"></lumau-spinner>
          {props.children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
