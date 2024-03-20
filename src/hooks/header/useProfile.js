import { useCommon } from 'hooks';
import jsCookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initUser, setUser } from 'store/userSlice';
/**
 * @description useProfile dropdown
 * @param {Function} setOpen
 * @returns {Object} profileList, profileClick
 */
const useProfile = (setOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { IS_SUPER_ADMIN } = useCommon();

  const setObj = IS_SUPER_ADMIN ? { label: '設定', key: 'setting' } : null;
  const profileList = [
    setObj,
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
      dispatch(setUser(initUser));
      jsCookie.remove('Jwt');
      localStorage.removeItem('UserInfo');
      navigate('/login', { replace: true });
    } else {
      setOpen(true);
    }
  };

  return { profileList, profileClick };
};
export { useProfile };
