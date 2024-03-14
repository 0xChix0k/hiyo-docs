import { LoadingOutlined } from '@ant-design/icons';
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
        indicator={<LoadingOutlined spin />}
      />
    </ConfigProvider>
  );
};

export { CusSpin };
