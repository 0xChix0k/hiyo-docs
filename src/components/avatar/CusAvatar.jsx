import Avatar, { genConfig } from 'react-nice-avatar';

const CusAvatar = () => {
  const config = genConfig();

  return <Avatar style={{ width: '40px', height: '40px' }} {...config} />;
};

export { CusAvatar };
