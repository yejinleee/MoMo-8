import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './App';
import { store } from './_redux/store';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { EditPasswordPage } from './pages/ProfilePage/EditPasswordPage';
import { EditProfilePage } from './pages/ProfilePage/EditProfilePage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SignUpPage } from './pages/SignupPage/SignupPage';
import { Header } from '@common/index';
import { Suspense } from 'react';
import { FallbackSpinner } from '@common/Fallback/FallbackSpinner';
import { StMainWrapper } from './style/StMainWrapper';

const preventLoginLoader = () => {
  const {
    userInfo: { user },
  } = store.getState();
  if (user) {
    return redirect('/');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <StMainWrapper>
              <Outlet />
            </StMainWrapper>
          </>
        ),
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: '/details/:id',
            element: (
              <Suspense fallback={<FallbackSpinner />}>
                <DetailPage />
              </Suspense>
            ),
          },
          {
            path: '/profile/:id',
            element: (
            <Suspense fallback={<FallbackSpinner />}>
              <ProfilePage />
            </Suspense>),
          },
          {
            path: '/editProfile',
            element: <EditProfilePage />,
          },
          {
            path: '/editPassword',
            element: <EditPasswordPage />,
          },
        ],
      },
      {
        path: '/login',
        loader: preventLoginLoader,
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
]);
