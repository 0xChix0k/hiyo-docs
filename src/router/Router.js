import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WithAuthentication from './WithAuthentication';
import WithLogin from './WithLogin';

// const Home = lazy(() => import('pages/HomePage'));
const Login = lazy(() => import('pages/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithAuthentication>
        <Suspense>
          {/* <Home /> */}
        </Suspense>
      </WithAuthentication>
    ),
    children: [
      {
        path: '/task/:id',
        element: (
          <WithAuthentication>
            <Suspense>
              {/* <Home /> */}
            </Suspense>
          </WithAuthentication>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <WithLogin>
        <Suspense>
          <Login />
        </Suspense>
      </WithLogin>
    ),
  },
]);

export default router;
