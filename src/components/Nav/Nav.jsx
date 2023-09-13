import MenuMobile from './MenuMobile';
import NavControls from './NavControls';

const Nav = () => {
  return (
    <>
      <nav className="sticky top-0 h-12 bg-slate-100 dark:bg-slate-950 shadow-[0_0_9px_3px_rgba(41,41,41,0.25)] z-10 py-0 px-6 flex items-center justify-around">
        <MenuMobile />
        <div className="flex w-full justify-center text-gray-900">
          <h1 className="text-2xl font-bold tracking-tighter">
            <span className="dark:text-yellow-100 text-slate-800">{'<'}</span>
            <span className="text-violet-900">lu</span>
            <span className="dark:text-yellow-100 text-slate-950">/</span>
            <span className="text-violet-600">mau</span>
            <span className="dark:text-yellow-100 text-slate-800">{'>'}</span>
          </h1>
        </div>
        <NavControls />
      </nav>
    </>
  );
};

export default Nav;
