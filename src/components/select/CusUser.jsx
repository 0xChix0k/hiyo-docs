/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Flex, Select, Space, Spin } from 'antd';
import { ReactComponent as IconArrow } from 'assets/icon-arrow_down.svg';
import { CusAvatar, CusEmpty } from 'components';
import users from 'data/dropdown/users.json';
import { useCommon } from 'hooks/useCommon';
import { useEffect, useState } from 'react';
import { useGetUsers } from 'services/dropdownService';
import { cssSelect } from './selectCss';

/**
 * @description Custom User Select
 * @param {string} value=null
 * @param {function} onChange
 * @param {function} onSelect=null
 * @param {boolean} disabled=false
 * @param {boolean} dw=null
 * @param {string} placeholder="請選擇"
 * @returns {JSX.Element}
 */
const CusUser = ({
  value = null,
  onChange,
  onSelect = null,
  disabled = false,
  dw = null,
  placeholder = '請選擇',
}) => {
  const { getNameById, debounceFn } = useCommon();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [newVaue, setNewValue] = useState(
    value
      ? {
          value: value,
          label: <GenTag value={value} data={users} getName={getNameById} />,
        }
      : null
  );
  const [searchInput, setSearchInput] = useState('');
  const [searchStr, setSearchStr] = useState(null);
  const { data, isLoading, isSuccess } = useGetUsers(searchStr);

  const handleChange = (value) => {
    // console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setNewValue({
      value: value.value,
      label: <GenTag value={value.value} data={users} getName={getNameById} />,
    });
    onChange(value.value);
  };

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
        data.map((item) => ({
          label: item.Name,
          value: item.Id,
          dep: item.Dep,
        }))
      );
    }
  }, [isSuccess, data]);

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
        showSearch
        labelInValue
        filterOption={false}
        value={newVaue}
        options={options}
        onSearch={handleSearch}
        notFoundContent={
          isLoading ? (
            <Spin size="small" />
          ) : !isLoading && searchStr ? (
            <CusEmpty />
          ) : null
        }
        onChange={handleChange}
        onSelect={onSelect}
        disabled={disabled}
        popupMatchSelectWidth={!dw ? true : dw}
        // menuItemSelectedIcon={null}
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
        optionRender={(option) => {
          return (
            <Space size={10}>
              <CusAvatar />
              {`${option.data.dep} ${option.data.label}`}
            </Space>
          );
        }}
        css={cssSelect}
      />
    </ConfigProvider>
  );
};
export { CusUser };

const GenTag = ({ value, data, getName }) => {
  const dep = getName(value, data, 'Id', 'Dep');
  const name = getName(value, data, 'Id', 'Name');

  return (
    <>
      {!dep || !name ? null : (
        <Flex align="center" gap={10} css={cssTag}>
          <CusAvatar />
          {`${dep} ${name}`}
        </Flex>
      )}
    </>
  );
};

const cssTag = css`
  height: 100%;
`;
