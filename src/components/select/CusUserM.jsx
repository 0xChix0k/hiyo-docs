/** @jsxImportSource @emotion/react */
import { ConfigProvider, Select, Space, Spin } from 'antd';
import { ReactComponent as IconArrow } from 'assets/icon-arrow_down.svg';
import { CusAvatar, CusEmpty, CusTagUser } from 'components';
import users from 'data/dropdown/users.json';
import { useCommon } from 'hooks/useCommon';
import { useEffect, useState } from 'react';
import { useGetUsers } from 'services/dropdownService';
import { cssSelect } from './selectCss';
// import {CloseOutlined} from '@ant-design/icons';

/**
 * @description Custom Select
 * @param {Array<object>} value=[]
 * @param {function} onChange
 * @param {function} onSelect
 * @param {boolean} disabled=false
 * @param {boolean} dw=null
 * @param {string} placeholder="請選擇"
 * @returns  {JSX.Element}
 */
const CusUserM = ({
  value = [],
  onChange,
  onSelect = null,
  disabled = false,
  dw = null,
  placeholder = '請選擇',
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchIStr, setSearchStr] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const { data, isLoading, isSuccess } = useGetUsers(searchIStr);

  const { getNameById, debounceFn } = useCommon();

  const handleSearch = (v) => {
    setOptions([]);
    setSearchInput(v);
    debounceFn(v, setSearchStr);
    if (!v) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOptions(
        data
          ?.filter((item) => !value.includes(item.Id))
          ?.map((item) => ({
            label: item.Name,
            value: item.Id,
            dep: item.Dep,
          }))
      );
    }
  }, [isSuccess, data, value]);

  useEffect(() => {
    if (!open) {
      setSearchInput('');
      setSearchStr(null);
      setOptions([]);
    }
  }, [open]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: 'var(--grey-20)',
          borderRadiusLG: 10,
          fontSizeLG: 14,
          colorText: 'var(--grey-default)',
          colorTextPlaceholder: 'var(--grey-50)',
          paddingSM: 15,
        },
        components: {
          Select: {
            // selectorBg: 'var(--grey-20)',
            optionHeight: 40,
            optionActiveBg: 'var(--grey-10)',
            optionPadding: '11px 14px',
            optionSelectedBg: 'var(--primary-light)',
            optionSelectedColor: 'var(--primary-default)',
          },
        },
      }}
    >
      <Select
        mode="multiple"
        showSearch
        allowClear
        filterOption={false}
        value={value}
        options={options}
        onSearch={handleSearch}
        notFoundContent={
          isLoading ? (
            <Spin size="small" delay={0} />
          ) : !isLoading && searchIStr ? (
            <CusEmpty />
          ) : null
        }
        onChange={onChange}
        onSelect={onSelect}
        disabled={disabled}
        popupMatchSelectWidth={!dw ? true : dw}
        menuItemSelectedIcon={null}
        size="large"
        placeholder={placeholder}
        dropdownStyle={{ padding: '10px 0' }}
        onDropdownVisibleChange={(open) => setOpen(open)}
        open={searchInput ? open : false}
        suffixIcon={
          <IconArrow
            style={{
              transform: !!options.length ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        }
        onFocus={() => setIsClose(true)}
        onBlur={() => setIsClose(false)}
        optionRender={(option) => {
          return (
            <Space size={10}>
              <CusAvatar wh={25} />
              {`${option.data.dep} ${option.data.label}`}
            </Space>
          );
        }}
        tagRender={(props) => tagRender(props, users, getNameById, isClose)}
        css={cssSelect}
      />
    </ConfigProvider>
  );
};

export { CusUserM };

const tagRender = (props, data, getNameById, isClose) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const dep = getNameById(value, data, 'Id', 'Dep');
  const name = getNameById(value, data, 'Id', 'Name');
  return (
    <CusTagUser
      text={`${dep} ${name}`}
      avatar={<CusAvatar wh={25} />}
      onMouseDown={onPreventMouseDown}
      closable={isClose ? closable : false}
      onClose={onClose}
    />
  );
};
