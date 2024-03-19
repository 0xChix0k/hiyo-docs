import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { usePostLogin } from 'services/loginService';
/**
 * @description use Login
 * @param {string} userId
 * @param {string} password
 * @param {boolean} remin
 * @param {Function} setLoading
 * @param {Function} setFial
 * @returns {object}
 */
const useLogin = (userId, password, company, remin, setLoading, setFial) => {
  const navigate = useNavigate();
  const mutation = usePostLogin();
  /**
   * @description onCheck
   * @returns {void}
   */
  const onCheck = () => {
    setLoading(true);
    mutation.mutate(
      { UserId: userId, Password: password },
      {
        onSuccess: (data) => {
          setFial(false);
          if (remin) {
            Cookies.set('userId', userId, { expires: 7 });
            Cookies.set('password', password, { expires: 7 });
            Cookies.set('company', company, { expires: 7 });
          } else {
            Cookies.remove('userId');
            Cookies.remove('password');
            Cookies.remove('company');
          }
          Cookies.set('Jwt', '123', { expires: 7 });
          navigate('/');
        },
        onError: (error) => {
          setFial(true);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return { onCheck };
};
export { useLogin };
