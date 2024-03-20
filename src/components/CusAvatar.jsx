import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * @description Custom Avatar
 * @param {string} cmNo='9999'
 * @param {string} empNo='9999'
 * @param {number} size=25
 * @returns {JSX.Element}
 */
const CusAvatar = ({ cmNo = '9999', empNo = '9999', size = 25 }) => {
  const [isError, setIsError] = useState(false);
  return (
    <Avatar
      src={`${API_URL}/avatar/${cmNo}/${empNo}`}
      size={size}
      icon={<UserOutlined />}
      onError={() => setIsError(true)}
      style={{ backgroundColor: isError ? 'var(--primary-default)' : null }}
    />
  );
};

export { CusAvatar };
