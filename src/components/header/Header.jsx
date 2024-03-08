/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconSearch } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import {
  CusAvatar,
  CusButton,
  CusDropdown,
  CusModal,
  CusTabs,
  TextInput,
} from 'components';
import { IconSetting } from 'components/icon';
import { SearchContent } from 'components/modal/content';
import { useFormCommon, useSearch } from 'hooks';
import { useAddForm, useProfile, useSetProps, useTabs } from 'hooks/header';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { initSearchData, selectCommon } from 'store/commonSlice';
import { selectUser } from 'store/userSlice';
import { cssHeader } from './headerCss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const addFormRef = useRef(null);
  const setRef = useRef(null);
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
  const { addModalProps } = useAddForm(
    addFormRef,
    setOpenNewForm,
    newFormData,
    setNewFormData,
    initFormData
  );
  const { tabs } = useTabs(userInfo.role === 'manager');
  const [openSet, setOpenSet] = useState(false);
  const { profileList, profileClick } = useProfile(setOpenSet);
  const { setPrrops } = useSetProps(setRef, setOpenSet);

  const { onInputSearch, onSearch, isFiltered } = useSearch();

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
      <CusModal
        open={openFilter}
        title={{ text: '進階篩選' }}
        isClose={true}
        onOk={() =>
          onValidate(searchRef, () => onSearch(tempData, setOpenFilter))
        }
        okStr="搜尋"
        exFn={() => {
          const resetData = initSearchData;
          setTempData(resetData);
          if (searchRef.current) {
            searchRef.current.setFieldsValue(resetData);
          }
        }}
        exBgColor={''}
        exType="text"
        exStr="重設"
        onCancel={() => setOpenFilter(false)}
        h={650}
        content={
          <SearchContent
            formInstance={searchRef}
            tempData={tempData}
            setTempData={setTempData}
          />
        }
      />
      {openNewForm && (
        <CusModal
          open={openNewForm}
          title={addModalProps?.title}
          isClose={addModalProps?.isClose}
          onOk={addModalProps?.onOk}
          onCancel={addModalProps?.onCancel}
          okStr={addModalProps?.okStr}
          w={addModalProps?.w}
          h={addModalProps?.h}
          content={addModalProps?.content}
        />
      )}
      {openSet && (
        <CusModal
          open={openSet}
          title={setPrrops?.title}
          isClose={setPrrops?.isClose}
          onOk={setPrrops?.onOk}
          onCancel={setPrrops?.onCancel}
          okStr={setPrrops?.okStr}
          w={setPrrops?.w}
          h={setPrrops?.h}
          content={setPrrops?.content}
        />
      )}
      <Flex align="center" gap={24}>
        <Logo style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
        <CusTabs tabKey={tabKey} items={tabs} />
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
          text="申請單"
          icon={<IconAdd />}
          bgColor="#2D336B"
          onClick={() => setOpenNewForm(true)}
        />
        <CusDropdown
          items={profileList}
          onClick={profileClick}
          btn={<CusAvatar config={userInfo.avatar} />}
        />
      </Flex>
    </Flex>
  );
};
export { Header };
