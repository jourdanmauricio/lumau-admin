/* eslint-disable react/prop-types */

import { useUserStore } from '@/store/user';
import { Navigate } from 'react-router-dom';

const AuthRoute = (props) => {
  const isLogged = useUserStore((state) => state.isLogged);
  if (!isLogged) {
    return <Navigate to="/" />;
  }
  return props.children;
};

const AuthRouteLogin = (props) => {
  const isLogged = useUserStore((state) => state.isLogged);
  if (isLogged) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }
  return props.children;
};

const AdminRoute = (props) => {
  const role = useUserStore((state) => state.role);
  if (role !== 'admin') {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return props.children;
};

export { AdminRoute, AuthRouteLogin, AuthRoute };
