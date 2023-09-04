// import { useUserStore } from './store/user';
import AppRoutes from './routes';

function App() {
  // const state = useUserStore((state) => state);

  // console.log('state', state);
  // if (state.theme) {
  //   state.theme === 'dark'
  //     ? document.documentElement.classList.add('dark')
  //     : document.documentElement.classList.add('light');
  // } else {
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia('(prefers-color-scheme: dark)').matches
  //   ) {
  //     document.documentElement.classList.add('dark');
  //     state.setTheme('dark');
  //   } else {
  //     document.documentElement.classList.add('light');
  //     state.setTheme('light');
  //   }
  // }

  return <AppRoutes />;
}

export default App;
