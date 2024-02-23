import { ConfigProvider, Input } from 'antd';

/**
 * @description Custom TextInput component
 * @param {string|number} value
 * @param {function} onChange
 * @param {string} size
 * @param {string} placeholder
 * @returns
 */
const TextInput = ({
  value,
  onChange,
  size = 'large',
  placeholder = '',
  type = 'text',
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'var(--grey-20)',
          colorBorder: 'var(--grey-20)',
          borderRadius: '10px',
          colorTextPlaceholder: 'var(--grey-50)',
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
      />
    </ConfigProvider>
  );
};

export { TextInput };
