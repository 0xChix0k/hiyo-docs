import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const WithAuthentication = ({ children }) => {
  const token = Cookies.get('Jwt');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default WithAuthentication;
