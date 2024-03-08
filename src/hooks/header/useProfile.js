import jsCookie from 'js-cookie';

const useProfile = (setOpen) => {
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
  const profileClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.clear();
      jsCookie.remove('Jwt');
      window.location.href = '/login';
    } else {
      setOpen(true);
    }
  };

  return { profileList, profileClick };
};
export { useProfile };
