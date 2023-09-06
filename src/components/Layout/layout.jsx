/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { NavLink } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Nav from '../Nav/Nav';
import { menuItems } from '@/utils/menuItems';
import '@/components/lumau-spinner.js';

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
          ${minItems ? 'w-56' : 'w-12'}
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

          {menuItems.map(
            (feature) =>
              feature.role.includes(user.role) &&
              user.attributes.includes(feature.name) && (
                <NavLink
                  key={feature.id}
                  to={feature.route}
                  className={({ isActive }) =>
                    ` py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                      isActive ? 'text-purple-700' : ''
                    } `
                  }
                >
                  <feature.icon className="mr-4 inline-block" />
                  <span className="align-middle">{feature.name}</span>
                </NavLink>
              )
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
