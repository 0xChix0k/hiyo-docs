import { ConfigProvider, Input } from 'antd';
import { IconClose } from 'components/icon';
/**
 * @description Custom TextInput component
 * @param {string|number} value
 * @param {function} onChange
 * @param {string} size
 * @param {string} placeholder
 * @param {string} type
 * @param {ReactNode} prefix
 * @param {ReactNode} suffix
 * @param {number} radius
 * @param {string} mW
 * @param {boolean} isClear
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
  isClear = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'var(--grey-20)',
          colorBorder: 'var(--grey-20)',
          borderRadiusLG: radius,
          colorTextPlaceholder: 'var(--grey-50)',
          controlHeightLG: 40,
        },
        components: {
          Input: {
            hoverBg: 'var(--grey-20)',
            hoverBorderColor: '#000',
            activeBg: 'var(--grey-20)',
            activeBorderColor: 'var(--blue-bright)',
            inputFontSizeLG: 14,
            paddingInlineLG: prefix ? 10 : 14,
            paddingBlockLG: suffix ? 4 : 11,
          },
        },
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        allowClear={isClear ? { clearIcon: <IconClose /> } : null}
        size={size}
        type={type}
        prefix={prefix}
        suffix={suffix}
        style={{ maxWidth: mW }}
      />
    </ConfigProvider>
  );
};

export { TextInput };
