/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconSearch } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { CusAvatar, CusButton, CusModal, CusTabs, TextInput } from 'components';
import { IconSetting } from 'components/icon';
import { SearchContent } from 'components/modal/content';
import items from 'data/headerTabs';
import { useSearch } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCommon } from 'store/commonSlice';
import { selectUser } from 'store/userSlice';
import { cssHeader } from './headerCss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector(selectUser);
  const { searchData } = useSelector(selectCommon);
  const [tabKey, setTabKey] = useState(location.pathname.slice(1));
  const [openFilter, setOpenFilter] = useState(false);
  const [tempData, setTempData] = useState(searchData);

  const { onInputSearch, onSearch } = useSearch();

  useEffect(() => {
    setTabKey(location.pathname.slice(1));
  }, [location.pathname]);

  useEffect(() => {
    setTempData(searchData);
  }, [searchData]);

  return (
    <Flex
      align="center"
      justify="space-between"
      flex={'0 0 60px'}
      css={cssHeader}
    >
      <CusModal
        open={openFilter}
        title={{ text: '進階篩選' }}
        isClose={true}
        onOk={() => onSearch(tempData)}
        onCancel={() => setOpenFilter(false)}
        okStr="搜尋"
        h={650}
        content={
          <SearchContent tempData={tempData} setTempData={setTempData} />
        }
      />
      <Flex align="center" gap={24}>
        <Logo style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
        <CusTabs tabKey={tabKey} items={items} />
      </Flex>
      <Flex align="center" gap={20}>
        <Flex flex={'1 1 300px'}>
          <TextInput
            value={searchData.text}
            onChange={onInputSearch}
            placeholder="搜尋"
            prefix={<IconSearch />}
            suffix={
              <IconSetting
                isClick={openFilter}
                onClick={() => setOpenFilter(true)}
              />
            }
            radius={93}
            isClear={true}
          />
        </Flex>
        <CusButton
          text="申請表單"
          icon={<IconAdd />}
          bgColor="#2D336B"
          tColor="white"
        />
        <CusAvatar config={userInfo.avatar} />
      </Flex>
    </Flex>
  );
};
export { Header };
