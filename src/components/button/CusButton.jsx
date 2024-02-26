import { Button, ConfigProvider } from 'antd';

/**
 * @description Custom Button
 * @param {string} text
 * @param {ReactNode} icon
 * @param {function} onClick
 * @param {boolean} disabled
 * @param {string} bgColor
 * @param {string} tColor
 * @param {string} size
 * @param {string} htmlType
 * @param {string} type
 * @param {boolean} isBlock
 * @param {number} radius
 * @returns
 */
const CusButton = ({
  text = 'NA',
  icon = null,
  onClick = () => {},
  disabled = false,
  bgColor = '#fff',
  tColor = '#000',
  size = 'large',
  htmlType = '',
  type = 'default',
  isBlock = false,
  radius = 10,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColor,
          colorText: tColor,
          colorBgContainer: bgColor,
          borderRadiusLG: radius,
        },
        components: {
          Button: {
            contentFontSizeLG: 14,
            fontWeight: 600,
            defaultHoverColor: tColor,
          },
        },
      }}
    >
      <Button
        size={size}
        onClick={onClick}
        disabled={disabled}
        htmlType={htmlType}
        type={type}
        block={isBlock}
      >
        {icon && icon}
        {text}
      </Button>
    </ConfigProvider>
  );
};

export { CusButton };
