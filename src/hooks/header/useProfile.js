const useProfile = () => {
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
  const profileClick = ({key}) => {
    console.log('key', key);
  };

  return { profileList, profileClick };
};
export { useProfile };
