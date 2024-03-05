/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { ReactComponent as IconSearch } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { CusAvatar, CusButton, CusModal, CusTabs, TextInput } from 'components';
import { IconSetting } from 'components/icon';
import { FormContent, SearchContent } from 'components/modal/content';
import items from 'data/headerTabs';
import { useFormCommon, useSearch } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCommon } from 'store/commonSlice';
import { selectUser } from 'store/userSlice';
import { cssHeader } from './headerCss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const addFormRef = useRef(null);
  const { onValidate } = useFormCommon();
  const { userInfo } = useSelector(selectUser);
  const { searchData } = useSelector(selectCommon);
  const [tabKey, setTabKey] = useState(location.pathname.slice(1));
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);
  const [tempData, setTempData] = useState(searchData);
  const initFormData = {
    TypeId: null,
    FormId: null,
    Comment: '',
    Des: '',
    Files: [],
  };
  const [newFormData, setNewFormData] = useState(initFormData);

  const { onInputSearch, onSearch, isFiltered } = useSearch();

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
        onOk={() =>
          onValidate(searchRef, () => onSearch(tempData, setOpenFilter))
        }
        onCancel={() => setOpenFilter(false)}
        okStr="搜尋"
        h={650}
        content={
          <SearchContent
            formInstance={searchRef}
            tempData={tempData}
            setTempData={setTempData}
          />
        }
      />
      <CusModal
        open={openNewForm}
        title={{ text: '新表單', icon: <IconForm /> }}
        isClose={true}
        onOk={() =>
          onValidate(addFormRef, () => {
            console.log('新增表單');
            setOpenNewForm(false);
          })
        }
        onCancel={() => {
          setNewFormData(initFormData);
          setOpenNewForm(false);
        }}
        okStr="提交"
        w={800}
        h={661}
        content={
          <FormContent
            formInstance={addFormRef}
            data={newFormData}
            setData={setNewFormData}
          />
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
                isClick={isFiltered(searchData)}
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
          onClick={() => setOpenNewForm(true)}
        />
        <CusAvatar config={userInfo.avatar} />
      </Flex>
    </Flex>
  );
};
export { Header };
