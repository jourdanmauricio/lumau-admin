import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const logout = useUserStore((state) => state.logout);
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-red-500">Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
