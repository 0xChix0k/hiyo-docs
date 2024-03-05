/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Input } from 'antd';
import { IconClose } from 'components/icon';
/**
 * @description Custom TextInput component
 * @param {string|number} value
 * @param {function} onChange
 * @param {string} size='large'
 * @param {string} placeholder=''
 * @param {string} type='text'
 * @param {ReactNode} prefix=null
 * @param {ReactNode} suffix=null
 * @param {number} radius=10
 * @param {string} mW='100%'
 * @param {number} h=40
 * @param {boolean} isClear=false
 * @param {boolean} isArea=false
 * @param {number} areaSize=3
 * @param {boolean} isErr=false
 * @returns
 */
const TextInput = ({
  value,
  onChange,
  size = 'large',
  placeholder = '',
  type = 'text',
  prefix = null,
  suffix = null,
  radius = 10,
  mW = '100%',
  h = 40,
  isClear = false,
  isArea = false,
  areaSize = 3,
  isErr = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorBgContainer: isErr ? 'white' : 'var(--grey-20)',
          colorBorder: 'var(--grey-20)',
          borderRadiusLG: radius,
          colorTextPlaceholder: 'var(--grey-50)',
          controlHeightLG: 40,
        },
        components: {
          Input: {
            // hoverBg: 'var(--grey-20)',
            hoverBorderColor: '#000',
            // activeBg: 'var(--grey-20)',
            activeBorderColor: 'var(--blue-bright)',
            inputFontSizeLG: 14,
            paddingInlineLG: prefix ? 10 : 14,
            paddingBlockLG: suffix ? 4 : 11,
          },
        },
      }}
    >
      {isArea ? (
        <Input.TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          allowClear={isClear ? { clearIcon: <IconClose /> } : null}
          size={size}
          type={type}
          prefix={prefix}
          suffix={suffix}
          css={cssInput(mW, h, isErr)}
          autoSize={{
            minRows: areaSize,
            maxRows: areaSize,
          }}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          allowClear={isClear ? { clearIcon: <IconClose /> } : null}
          size={size}
          type={type}
          prefix={prefix}
          suffix={suffix}
          css={cssInput(mW, h, isErr)}
        />
      )}
    </ConfigProvider>
  );
};

export { TextInput };

const cssInput = (mW, h, isErr) => css`
  max-width: ${mW};
  height: ${h}px;
  background: ${isErr ? 'white' : 'var(--grey-20)'};
  :hover {
    background: ${isErr ? 'white' : 'var(--grey-20)'};
  }
`;
