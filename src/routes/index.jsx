import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/auth/Login/Login';
import { AuthRouteLogin, AuthRoute } from '@/middlewares/auth';
import Spinner from '@/components/Spinner/Spinner';

const ForgotPassword = React.lazy(() =>
  import('@/pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
  import('@/pages/auth/RecoveryPassword/RecoveryPassword')
);

const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
// const Profile = React.lazy(() => import('@/pages/Profile/Tabs'));
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
          {/*              <Route
                path="/perfil"
                element={
                  <AuthRoute>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="/media"
                element={
                  <AuthRoute>
                    <Media />
                  </AuthRoute>
                }
              />
              <Route
                path="/configuracion"
                element={
                  <AuthRoute>
                    <Settings />
                  </AuthRoute>
                }
              />

              <Route
                path="/secciones"
                element={
                  <AuthRoute>
                    <Sections />
                  </AuthRoute>
                }
              /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
