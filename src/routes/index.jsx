import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/pages/auth/Login/Login';
import { AuthRouteLogin, AuthRoute, AdminRoute } from '@/utils/auth';
import Spinner from '@/components/Spinner/Spinner';
import Layout from '@/components/Layout/layout';

const ForgotPassword = React.lazy(() =>
  import('@/pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
  import('@/pages/auth/RecoveryPassword/RecoveryPassword')
);
const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('@/pages/Profile/Profile'));
const Subscribers = React.lazy(() => import('@/pages/Subscribers/Subscribers'));
const Contacts = React.lazy(() => import('@/pages/Contacts/Contacts'));
const Users = React.lazy(() => import('@/pages/Users/Users'));
const Loans = React.lazy(() => import('@/pages/Sections/Loans/Loans'));
const Offices = React.lazy(() => import('@/pages/Sections/Offices/Offices'));
const Services = React.lazy(() => import('@/pages/Sections/Services/Services'));
const Images = React.lazy(() => import('@/pages/Sections/Images/Images'));
const Sections = React.lazy(() => import('@/pages/Sections/Sections'));
const Posts = React.lazy(() => import('@/pages/Sections/Posts/Posts'));
const Lessons = React.lazy(() => import('@/pages/Sections/Lessons/Lessons'));
const ProdLibs = React.lazy(() => import('@/pages/Sections/ProdLibs/ProdLibs'));
const Slides = React.lazy(() => import('@/pages/Sections/Slides/Slides'));
const Orders = React.lazy(() => import('@/pages/Sections/Orders/Orders'));
const AuthInstagram = React.lazy(() => import('@/pages/auth/AuthInstagram'));
const ConfigSection = React.lazy(() =>
  import('@/pages/ConfigSections/ConfigSection/ConfigSection')
);

const ConfigSections = React.lazy(() =>
  import('@/pages/ConfigSections/ConfigSections')
);

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }
          >
            <Route
              path="/auth-instagram"
              element={
                <AuthRoute>
                  <AuthInstagram />
                </AuthRoute>
              }
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
              path="/config-sections"
              element={
                <AdminRoute>
                  <SubRouter />
                </AdminRoute>
              }
            >
              <Route
                index
                element={<ConfigSections />}
              />
              <Route
                path=":id"
                element={<ConfigSection />}
              />
            </Route>
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
              path="/sections"
              element={
                <AuthRoute>
                  <SubRouter />
                </AuthRoute>
              }
            >
              <Route
                index
                element={<Sections />}
              />
              <Route
                path="services"
                element={
                  <AuthRoute>
                    <Services />
                  </AuthRoute>
                }
              />
              <Route
                path="images"
                element={
                  <AuthRoute>
                    <Images />
                  </AuthRoute>
                }
              />
              <Route
                path="loans"
                element={
                  <AuthRoute>
                    <Loans />
                  </AuthRoute>
                }
              />
              <Route
                path="offices"
                element={
                  <AuthRoute>
                    <Offices />
                  </AuthRoute>
                }
              />
              <Route
                path="posts"
                element={
                  <AuthRoute>
                    <Posts />
                  </AuthRoute>
                }
              />
              <Route
                path="lessons"
                element={
                  <AuthRoute>
                    <Lessons />
                  </AuthRoute>
                }
              />
              <Route
                path="prod-libs"
                element={
                  <AuthRoute>
                    <ProdLibs />
                  </AuthRoute>
                }
              />
              <Route
                path="slides"
                element={
                  <AuthRoute>
                    <Slides />
                  </AuthRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <AuthRoute>
                    <Orders />
                  </AuthRoute>
                }
              />
            </Route>
          </Route>
          <Route
            path="/login"
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
        </Routes>
      </Suspense>
    </Router>
  );
}

function SubRouter() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default AppRoutes;
