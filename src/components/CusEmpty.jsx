import { Empty } from 'antd';

const CusEmpty = ({ text = '找不到資料' }) => {
  return <Empty description={text} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export { CusEmpty };
