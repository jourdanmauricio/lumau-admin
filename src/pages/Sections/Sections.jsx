import { NavLink, Outlet } from 'react-router-dom';
import { useSectionsStore } from '../../store/sections';
import { useUserStore } from '../../store/user';

const Sections = () => {
  const { sections } = useSectionsStore();
  const { user } = useUserStore();
  return (
    <>
      {sections.map(
        (section) =>
          user.attributes.includes(section.name) && (
            <NavLink
              key={section.id}
              to={section.route}
              className="py-2 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 text-purple-700"
            >
              <span className="align-middle">{section.name}</span>
            </NavLink>
          )
      )}

      <Outlet />
    </>
  );
};
export default Sections;
