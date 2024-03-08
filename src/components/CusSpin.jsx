import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Spin } from 'antd';

const CusSpin = ({
  loading = false,
  delay = 300,
  full = false,
  size = 'large',
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            dotSizeSM: 14,
            dotSize: 20,
            dotSizeLG: 50,
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
