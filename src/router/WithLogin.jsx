import Cookies from 'js-cookie';
import { startTransition } from 'react';
import { Navigate } from 'react-router-dom';

const WithLogin = ({ children }) => {
  const token = Cookies.get('Jwt');
  if (token) {
    startTransition(() => {
      return <Navigate to="/" replace />;
    });
  }
  return children;
};

export default WithLogin;
