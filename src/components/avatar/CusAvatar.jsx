import Avatar, { genConfig } from 'react-nice-avatar';

/**
 * @description Custom Avatar
 * @param {string} wh=40
 * @param {object} config=genConfig()
 * @returns
 */
const CusAvatar = ({ wh = 40, config = genConfig() }) => {
  return <Avatar style={{ width: wh, height: wh }} {...config} />;
};

export { CusAvatar };
