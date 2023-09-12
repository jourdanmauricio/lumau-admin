import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/auth/Login/Login';
import { AuthRouteLogin, AuthRoute, AdminRoute } from '@/utils/auth';
import Spinner from '@/components/Spinner/Spinner';

const ForgotPassword = React.lazy(() =>
  import('@/pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
  import('@/pages/auth/RecoveryPassword/RecoveryPassword')
);

const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
// const Profile = React.lazy(() => import('@/pages/Profile/Tabs'));
const Profile = React.lazy(() => import('@/pages/Profile/Profile'));
const Subscribers = React.lazy(() => import('@/pages/Subscribers/Subscribers'));
const Contacts = React.lazy(() => import('@/pages/Contacts/Contacts'));
const Users = React.lazy(() => import('@/pages/Users/Users'));
const Loans = React.lazy(() => import('@/pages/Loans/Loans'));
const Services = React.lazy(() => import('@/pages/Services/Services'));
// const Settings = React.lazy(() => import('@/pages/Settings/Settings'));
// const Media = React.lazy(() => import('@/pages/Media/Media'));
// const Sections = React.lazy(() => import('@/pages/Sections/Sections'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRouteLogin>
                <Login />
              </AuthRouteLogin>
            }
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/recovery-password"
            element={<RecoveryPassword />}
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/subscribers"
            element={
              <AuthRoute>
                <Subscribers />
              </AuthRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <AuthRoute>
                <Contacts />
              </AuthRoute>
            }
          />
          <Route
            path="/loans"
            element={
              <AuthRoute>
                <Loans />
              </AuthRoute>
            }
          />
          <Route
            path="/services"
            element={
              <AuthRoute>
                <Services />
              </AuthRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
