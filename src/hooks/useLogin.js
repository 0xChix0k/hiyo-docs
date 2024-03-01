import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

/**
 * @description use Login
 * @param {string} userId 
 * @param {string} password 
 * @param {boolean} remin 
 * @param {Function} setResult 
 * @returns {object}
 */
const useLogin = (userId, password, remin, setResult) => {
  const navigate = useNavigate();

  /**
   * @description onCheck
   * @returns {void}
   */
  const onCheck = () => {
    if (userId === 'hiyo' && password === '000') {
      setResult(false);
      if (remin) {
        Cookies.set('userId', userId, { expires: 7 });
        Cookies.set('password', password, { expires: 7 });
      } else {
        Cookies.remove('userId');
        Cookies.remove('password');
      }
      Cookies.set('Jwt', '123', { expires: 7 });
      navigate('/');
    } else {
      setResult(true);
    }
  };

  return { onCheck };
};
export { useLogin };
