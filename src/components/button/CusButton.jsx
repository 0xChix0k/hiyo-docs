import { Button, ConfigProvider } from 'antd';

const CusButton = ({
  text = 'NA',
  icon = null,
  onClick = () => {},
  disabled = false,
  bgColor = '#fff',
  tColor = '#000',
  size = 'large',
  htmlType = '',
  isBlock = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgColor,
          colorText: tColor,
          colorBgContainer: bgColor,
        },
        components: {
          Button: {
            contentFontSizeLG: '14px',
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
        block={isBlock}
      >
        {icon && icon}
        {text}
      </Button>
    </ConfigProvider>
  );
};

export { CusButton };
