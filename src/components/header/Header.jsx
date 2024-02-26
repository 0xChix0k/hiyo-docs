/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactComponent as IconSearch } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { CusAvatar, CusButton, CusTabs, TextInput } from 'components';
import { IconSetting } from 'components/icon';
import items from 'data/headerTabs';
import { useSearch } from 'hooks';
import { useEffect, useState } from 'react';
import { genConfig } from 'react-nice-avatar';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCommon } from 'store/commonSlice';
import { cssHeader } from './headerCss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchStr } = useSelector(selectCommon);
  const [config, setConfig] = useState(genConfig());
  const [tabKey, setTabKey] = useState(location.pathname.slice(1));

  const { onSearch } = useSearch();

  useEffect(() => {
    setTabKey(location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <Flex
      align="center"
      justify="space-between"
      flex={'0 0 60px'}
      css={cssHeader}
    >
      <Flex align="center" gap={24}>
        <Logo style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
        <CusTabs tabKey={tabKey} items={items} />
      </Flex>
      <Flex align="center" gap={20}>
        <Flex flex={'1 1 300px'}>
          <TextInput
            value={searchStr}
            onChange={onSearch}
            placeholder="搜尋"
            prefix={<IconSearch />}
            suffix={<IconSetting onClick={() => console.log('11')} />}
            radius={93}
            isClear={true}
          />
        </Flex>
        <CusButton
          text="申請表單"
          icon={<PlusOutlined />}
          bgColor="var(--grey-default)"
          tColor="white"
          radius={33}
        />
        <CusAvatar config={config} />
      </Flex>
    </Flex>
  );
};
export { Header };
