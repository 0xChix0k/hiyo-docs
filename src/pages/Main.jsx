import { Flex } from 'antd';
import { Header } from 'components';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <Flex vertical>
      <Header />
      <Flex vertical flex={'1 1 100%'}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default Main;
