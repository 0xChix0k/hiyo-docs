import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePostLogin } from 'services/loginService';
import { setUser } from 'store/userSlice';

/**
 * @description use Login
 * @param {Function} setLoading
 * @param {Function} setFial
 * @returns {object}
 */
const useLogin = (setLoading, setFial) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = usePostLogin();

  const formInit = {
    empNo: localStorage.getItem('EmpNo') || '',
    password: localStorage.getItem('Password') || '',
    companyNo: localStorage.getItem('CompanyNo') || null,
    remin: localStorage.getItem('EmpNo') ? true : false,
  };

  /**
   * @description onLogin
   * @param {string} empNo
   * @param {string} password
   * @param {string} companyNo
   * @param {boolean} remin
   * @returns {void}
   */
  const onLogin = (empNo, password, companyNo, remin) => {
    setLoading(true);
    mutation.mutate(
      { EmpNo: empNo, Password: password, CompanyNo: companyNo },
      {
        onSuccess: (data) => {
          setFial(false);
          if (remin) {
            localStorage.setItem('EmpNo', empNo);
            localStorage.setItem('Password', password);
            localStorage.setItem('CompanyNo', companyNo);
          } else {
            localStorage.removeItem('EmpNo');
            localStorage.removeItem('Password');
            localStorage.removeItem('CompanyNo');
          }
          localStorage.setItem('UserInfo', JSON.stringify(data.UserInfo));
          dispatch(setUser(data.UserInfo));
          Cookies.set('Jwt', data.Jwt);
          navigate('/');
        },
        onError: (error) => {
          console.log('login error:', error);
          setFial(true);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return { formInit, onLogin };
};
export { useLogin };
