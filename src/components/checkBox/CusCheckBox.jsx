/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Checkbox } from 'antd';

/**
 * @description custom checkbox
 * @param {string} label
 * @param {boolean} checked
 * @param {function} onChange
 * @param {boolean} disabled
 * @returns
 */
const CusCheckBox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="cuCh"
      css={cssCusCheckBox}
    >
      {label}
    </Checkbox>
  );
};

export { CusCheckBox };

const cssCusCheckBox = css`
  :is(.ant-checkbox-wrapper-checked) {
    .ant-checkbox-inner {
      border: 1px solid var(--blue-bright);
    }
  }
  .ant-checkbox-inner {
    border-radius: 5px;
    border: 1px solid var(--grey-70);
    ::after {
      inset-inline-start: 20%;
    }
  }
  span:nth-of-type(2) {
    color: var(--grey-60);
  }
`;
