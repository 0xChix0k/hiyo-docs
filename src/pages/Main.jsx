import { Flex } from 'antd';
import { Header } from 'components';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/todo');
    }
  });

  return (
    <Flex vertical style={{ width: '100%', height: '100%' }}>
      <Header />
      <Flex vertical flex={'1 1 100%'} style={{ overflowY: 'auto' }}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default Main;
