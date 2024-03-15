import { Divider, ConfigProvider } from 'antd';

const CusDivider = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          margin: 0,
          marginLG: 0,
        },
        components: {
          Divider: {
            // verticalMarginInline: 1,
            // orientationMargin: 1,
            // textPaddingInline: 22,
          },
        },
      }}
    >
      <Divider />
    </ConfigProvider>
  );
};
export { CusDivider };
