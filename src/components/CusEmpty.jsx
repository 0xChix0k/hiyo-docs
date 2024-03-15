import { Empty } from 'antd';


/**
 * @description Custom Empty
 * @param {string} text
 * @returns 
 */
const CusEmpty = ({ text = '找不到資料' }) => {
  return <Empty description={text} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export { CusEmpty };
