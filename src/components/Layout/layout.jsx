import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaCog,
  FaAngleLeft,
  FaAngleRight,
  FaTh,
  FaUserCog,
  FaRegImages,
  FaThList,
} from 'react-icons/fa';

import Nav from '../Nav/nav';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  let user = useSelector((state) => state.user.user);

  const [minItems, setMinItems] = useState(false);

  const handleMinItems = () => {
    setMinItems(!minItems);
  };
  return (
    <div className="grid min-h-screen grid-layout">
      <Nav />
      <main className="flex w-full">
        <div
          className={`hidden sm:inline-block h-full top-12 left-0 bg-slate-100 overflow-x-hidden pt-5 whitespace-nowrap transition-width 
          ${minItems ? 'w-52' : 'w-12'}
					`}
        >
          <button
            onClick={handleMinItems}
            className="h-8 w-full hover:text-purple-500 text-center"
          >
            <div className="text-xl pl-4 ">
              {minItems ? <FaAngleLeft /> : <FaAngleRight />}
            </div>
          </button>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `py-4 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
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
              `py-5 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
          >
            <FaTh className="mr-4 inline-block" />
            <span className="align-middle">Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-4 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                isActive ? 'text-purple-700' : ''
              } `
            }
            to="/media"
          >
            <FaRegImages className="mr-4 inline-block" />
            <span className="align-middle">Media</span>
          </NavLink>
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
                <FaCog className="mr-4 inline-block" />
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
              <FaThList className="mr-4 inline-block" />
              <span className="align-middle">Secciones</span>
            </NavLink>
          )}
        </div>

        <section
          className={`w-full ml-0 py-4 px-4 bg-slate-50 transform transition duration-500 ease-in-out border-l border-solid border-slate-300 
          `}
        >
          {props.children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
