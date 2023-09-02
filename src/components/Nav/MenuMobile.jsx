import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaBoxOpen,
  FaCog,
  FaRegCalendarAlt,
  FaTh,
  FaUserCog,
  FaUsers,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function MenuMobile() {
  const [open, setOpen] = useState(false);

  let menuRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  return (
    <>
      <div
        className="sm:hidden"
        ref={menuRef}
      >
        <FaBars
          className="text-2xl text-gray-900 dark:text-slate-100"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <div
          className={`text-gray-900 dark:text-slate-100 absolute top-[48px] left-0 w-fit bg-slate-100 dark:bg-slate-950 dropdown-menu
           ${open ? 'active' : 'inactive'}`}
        >
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
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
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
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
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
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
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
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
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
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
                  `py-4 pl-8 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                    isActive ? 'text-purple-700' : ''
                  }  `
                }
              >
                <FaUsers className="mr-4 inline-block" />
                <span className="align-middle">Usuarios</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
