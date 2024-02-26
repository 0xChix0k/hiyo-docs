import Avatar, { genConfig } from 'react-nice-avatar';

const CusAvatar = ({ w = '40px', h = '40px', config = genConfig() }) => {
  return <Avatar style={{ width: w, height: h }} {...config} />;
};

export { CusAvatar };
