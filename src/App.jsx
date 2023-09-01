import { useUserStore } from './store/user';
import AppRoutes from './routes';

function App() {
  const user = useUserStore((state) => state.user);
  const isLogged = useUserStore((state) => state.isLogged);

  console.log('user', user, isLogged);
  return <AppRoutes />;
}

export default App;
