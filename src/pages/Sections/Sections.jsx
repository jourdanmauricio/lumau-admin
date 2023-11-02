import { NavLink, Outlet } from 'react-router-dom';
import { useSectionsStore } from '../../store/sections';
import { useUserStore } from '../../store/user';

const Sections = () => {
  const { sections } = useSectionsStore();
  const { user } = useUserStore();
  return (
    <>
      <section className="flex flex-grow flex-row flex-wrap gap-4 justify-center items-center mt-8">
        {sections.map(
          (section) =>
            user.attributes.includes(section.name) && (
              <div
                key={section.id}
                className="border p-4 border-solid dark:border-gray-600 border-gray-200 rounded max-w-[200px] min-h-[250px] flex flex-col gap-4 justify-start items-center shadow-xl dark:shadow-lg"
              >
                <NavLink
                  to={section.route}
                  className="py-2 pl-4 w-fit pr-[14px] no-underline text-lg block text-left hover:text-purple-500  bg-slate-900 rounded"
                >
                  <span className="align-middle text-slate-100">
                    {section.name}
                  </span>
                </NavLink>
                <p>{section.description}</p>
              </div>
            )
        )}
      </section>

      <Outlet />
    </>
  );
};
export default Sections;
