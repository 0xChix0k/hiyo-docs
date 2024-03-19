/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Checkbox, ConfigProvider } from 'antd';

/**
 * @description custom checkbox
 * @param {string} label
 * @param {boolean} checked
 * @param {function} onChange
 * @param {boolean} disabled
 * @param {string} bgColor
 * @param {string} tColor
 * @returns {JSX.Element}
 */
const CusCheckBox = ({
  label,
  checked,
  onChange,
  disabled = false,
  bgColor = '#07CE6F',
  tColor = '#2D336B',
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColor,
          colorPrimaryBorder: bgColor,
          colorPrimaryHover: bgColor,
          colorBorder: disabled ? '#d9d9d9' : bgColor,
          colorText: tColor,
          borderRadiusSM: 5,
        },
      }}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="cuCh"
        css={cssCusCheckBox}
      >
        {label}
      </Checkbox>
    </ConfigProvider>
  );
};

export { CusCheckBox };

const cssCusCheckBox = css`
  .ant-checkbox-inner {
    ::after {
      inset-inline-start: 20%;
    }
  }
  /* span:nth-of-type(2) {
    color: var(--grey-60);
  } */
`;
