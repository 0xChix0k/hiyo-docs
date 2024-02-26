import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WithAuthentication from './WithAuthentication';
import WithLogin from './WithLogin';

const Login = lazy(() => import('pages/Login'));
const Main = lazy(() => import('pages/Main'));
const Todo = lazy(() => import('pages/Todo'));

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
        path: '/todo',
        element: (
          <WithAuthentication>
            <Suspense>
              <Todo />
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/my-form',
        element: (
          <WithAuthentication>
            <Suspense>
              {/* <Home /> */}
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/libray',
        element: (
          <WithAuthentication>
            <Suspense>
              {/* <Home /> */}
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/setting',
        element: (
          <WithAuthentication>
            <Suspense>
              {/* <Home /> */}
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
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
