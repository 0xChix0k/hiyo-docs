import { CusSpin } from 'components';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import WithAuthentication from './WithAuthentication';
import WithLogin from './WithLogin';

const Login = lazy(() => import('pages/Login'));
const Main = lazy(() => import('pages/Main'));
const Todo = lazy(() => import('pages/Todo'));
const MyForm = lazy(() => import('pages/MyForm'));
const Setting = lazy(() => import('pages/Setting'));
const Document = lazy(() => import('pages/Document'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithAuthentication>
        <Suspense fallback={<CusSpin loading={true} full={true} />}>
          <Main />
        </Suspense>
      </WithAuthentication>
    ),
    children: [
      {
        path: '/todo',
        element: (
          <WithAuthentication>
            <Suspense fallback={<CusSpin loading={true} full={true} />}>
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
            <Suspense fallback={<CusSpin loading={true} full={true} />}>
              <MyForm />
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/document',
        element: (
          <WithAuthentication>
            <Suspense fallback={<CusSpin loading={true} full={true} />}>
              <Document />
            </Suspense>
          </WithAuthentication>
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/setting',
        element: (
          <WithAuthentication>
            <Suspense fallback={<CusSpin loading={true} full={true} />}>
              <Setting />
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
