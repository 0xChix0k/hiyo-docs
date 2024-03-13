/** @jsxImportSource @emotion/react  */
import { css } from '@emotion/react';
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
  size = 'large',
  htmlType = '',
  type = 'default',
  isBlock = false,
  radius = 33,
}) => {
  const btnStyle = getStyles(bgColor);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: bgColor,
            colorText: btnStyle.tx,
            colorBgContainer: bgColor,
            borderRadiusLG: radius,
          },
          components: {
            Button: {
              contentFontSizeLG: 14,
              fontWeight: 600,
              defaultHoverColor: btnStyle.txH,
              defaultBg: bgColor,
              defaultHoverBg: btnStyle.bgH,
              defaultBorderColor: btnStyle.bor,
              defaultHoverBorderColor: btnStyle.borH,
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
          css={cssButton(getStyles(bgColor).tx)}
        >
          {icon && icon}
          {text}
        </Button>
      </ConfigProvider>
    </div>
  );
};

export { CusButton };

const getStyles = (bgColor) => {
  const bgH =
    bgColor === '#F1F6FF'
      ? '#D9E6FF'
      : bgColor === '#2D336B'
      ? '#222962'
      : bgColor === '#07CE6F'
      ? '#00A756'
      : bgColor === '#EFF0F8'
      ? '#DEE1F4'
      : bgColor === '#EF4564'
      ? '#C7334E'
      : '#fff';
  const bor = bgColor;
  const borH = bgH;
  const tx =
    bgColor === '#F1F6FF'
      ? '#0066FF'
      : bgColor === '#2D336B' || bgColor === '#07CE6F' || bgColor === '#EF4564'
      ? 'white'
      : bgColor === '#EFF0F8'
      ? '#2D336B'
      : '#8F9BC8';
  const txH = tx;

  return {
    bgH,
    bor,
    borH,
    tx,
    txH,
  };
};

const cssButton = (iconColor) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  svg {
    width: 15px;
    height: 15px;
    path {
      fill: ${iconColor};
    }
  }
`;
