/** @jsxImportSource @emotion/react */
import Icon, { LoadingOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { ConfigProvider, Spin } from 'antd';
/**
 * @description Custom Spin
 * @param {boolean} loading=false
 * @param {number} delay=300
 * @param {boolean} full=false
 * @param {string} size='large'
 * @param {number} dotSize=50
 * @returns {JSX.Element}
 */
const CusSpin = ({
  loading = false,
  delay = 300,
  full = false,
  size = 'large',
  dotSize = 50,
  // bgColor = '#3A3D5CCC',
  bgColor = 'var(--grey-20)',
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            dotSizeSM: 14,
            dotSize: 20,
            dotSizeLG: dotSize,
          },
        },
      }}
    >
      <Spin
        spinning={loading}
        delay={delay}
        size={size}
        fullscreen={full}
        css={cssSpin(bgColor)}
        indicator={
          <Icon
            component={LoadingOutlined}
            style={{ color: 'var(--primary-default)' }}
          />
        }
      />
    </ConfigProvider>
  );
};

export { CusSpin };

const cssSpin = (bgColor) => css`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  .ant-spin-dot .ant-spin-dot-item {
    background-color: var(--primary-default);
  }
  :is(.ant-spin-fullscreen) {
    /* background-color: rgba(0, 0, 0, 0.2); */
    background-color: ${bgColor};
  }
`;
