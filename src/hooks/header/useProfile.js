import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

/**
 * @description useProfile dropdown
 * @param {Function} setOpen 
 * @returns {Object} profileList, profileClick
 */
const useProfile = (setOpen) => {
  const navigate = useNavigate();
  const profileList = [
    {
      label: '設定',
      key: 'setting',
    },
    {
      label: '登出',
      key: 'logout',
    },
  ];

  /**
   * @description profileClick
   * @param {string} key
   * @returns {void} 
   */
  const profileClick = ({ key }) => {
    if (key === 'logout') {
      jsCookie.remove('Jwt');
      // window.location.href = '/login';
      navigate('/login', { replace: true });
    } else {
      setOpen(true);
    }
  };

  return { profileList, profileClick };
};
export { useProfile };
