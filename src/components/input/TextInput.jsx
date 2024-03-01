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
          style={{ maxWidth: mW, height: h }}
          autoSize={{
            minRows: 3,
            maxRows: 3,
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
          style={{ maxWidth: mW, height: h }}
        />
      )}
    </ConfigProvider>
  );
};

export { TextInput };
