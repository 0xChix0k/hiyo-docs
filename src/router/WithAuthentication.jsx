import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { startTransition } from 'react';

const WithAuthentication = ({ children }) => {
  const token = Cookies.get('Jwt');
  if (!token) {
    startTransition(() => {
      return <Navigate to="/login" replace />;
    });
  }
  return children;
};

export default WithAuthentication;
