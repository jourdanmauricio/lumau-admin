import Layout from '@/components/Layout/layout';
// import axios from 'axios';
import { regeneratePage } from '../../services/api/auth.api';
import { useNotification } from '../../components/Notifications/NotificationProvider';
import { config } from '../../config/config';
// import Tabs from './Tabs/Tabs';

const Dashboard = () => {
  const dispatchNotif = useNotification();
  const handleRegenerateWeb = async () => {
    try {
      const resp = await regeneratePage({ repo: config.repo });
      console.log('Resp', resp);
      if (resp.status === 200) {
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Página regenerada',
        });
      }
    } catch (error) {
      console.log('Error', error);
      dispatchNotif({
        type: 'ERROR',
        message: 'Error regenerando la página',
      });
    }
  };

  return (
    <Layout>
      <h1 className="text-gray-900 dark:text-slate-100">Dashboard</h1>
      {/* <Tabs /> */}
      <button
        className="btn-confirm"
        onClick={handleRegenerateWeb}
      >
        Regerar página web
      </button>
    </Layout>
  );
};

export default Dashboard;
