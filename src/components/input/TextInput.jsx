import { ConfigProvider, Input } from 'antd';

/**
 * @description Custom TextInput component
 * @param {string|number} value
 * @param {function} onChange
 * @param {string} size
 * @param {string} placeholder
 * @param {string} type
 * @param {ReactNode} prefix
 * @param {ReactNode} suffix
 * @param {string} radius
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
  radius = '10px',
  mW = '100%',
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'var(--grey-20)',
          colorBorder: 'var(--grey-20)',
          borderRadius: radius,
          colorTextPlaceholder: 'var(--grey-50)',
          controlHeightLG: '40px',
        },
        components: {
          Input: {
            hoverBg: 'var(--grey-20)',
            hoverBorderColor: '#000',
            activeBg: 'var(--grey-20)',
            activeBorderColor: 'var(--blue-bright)',
            paddingBlockLG: '12px',
            paddingInlineLG: '14px',
            inputFontSizeLG: '14px',
          },
        },
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
