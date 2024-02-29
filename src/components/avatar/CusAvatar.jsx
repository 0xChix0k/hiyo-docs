import Avatar, { genConfig } from 'react-nice-avatar';


/**
 * @description Custom Avatar
 * @param {string} w='40px' 
 * @param {string} h='40px'
 * @param {object} config=genConfig()
 * @returns 
 */
const CusAvatar = ({ w = '40px', h = '40px', config = genConfig() }) => {
  return <Avatar style={{ width: w, height: h }} {...config} />;
};

export { CusAvatar };
