/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Select } from 'antd';
import { ReactComponent as IconArrow } from 'assets/icon-arrow_down.svg';
import { useState } from 'react';

/**
 * @description Custom Select
 * @param {Array} options
 * @param {string|number} value
 * @param {function} onChange
 * @param {boolean} disabled
 * @param {string} dw
 * @returns
 */
const CusSelect = ({
  options = [],
  value,
  onChange,
  disabled = false,
  dw = null,
}) => {
  const genOptions = options.map((item, index) => {
    return {
      label: item.Name,
      value: item.Id,
    };
  });
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: 'var(--grey-20)',
          borderRadiusLG: 10,
          fontSizeLG: 14,
          colorText: 'var(--grey-default)',
        },
        components: {
          Select: {
            selectorBg: 'var(--grey-20)',
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
        value={value}
        options={genOptions}
        onChange={onChange}
        disabled={disabled}
        popupMatchSelectWidth={!dw ? true : dw}
        size="large"
        placeholder="請選擇"
        dropdownStyle={{ padding: '10px 0' }}
        onDropdownVisibleChange={(open) => setOpen(open)}
        suffixIcon={
          <IconArrow
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        }
        css={cssSelect}
      />
    </ConfigProvider>
  );
};

export { CusSelect };

const cssSelect = css`
  :not(.ant-select-focused) {
    .ant-select-selector {
      :hover {
        border: 1px solid black !important;
      }
    }
  }
  :is(.ant-select-focused) {
    .ant-select-selector {
      border: 1px solid var(--blue-bright);
    }
  }
`;
