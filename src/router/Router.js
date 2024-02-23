import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WithAuthentication from './WithAuthentication';
import WithLogin from './WithLogin';

const Main = lazy(() => import('pages/Main'));
const Login = lazy(() => import('pages/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithAuthentication>
        <Suspense>
          <Main />
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
