import { App as AntApp, ConfigProvider } from 'antd';
import localeEn from 'antd/locale/en_US';
import localeZh from 'antd/locale/zh_TW';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { selectCommon } from 'store/commonSlice';
import i18n from './i18n';
import Router from './router/Router';

export const LNG = i18n.language;

function App() {
  const { mesType } = useSelector(selectCommon);
  return (
    <ConfigProvider
      locale={LNG === 'zh' ? localeZh : localeEn}
      autoInsertSpaceInButton={false} //移除两个汉字之间的空格
      theme={{
        token: {
          colorError: '#ef4564',
          colorSplit: 'var(--grey-30)',
        },
        components: {
          Message: {
            contentBg:
              mesType === 'success' ? 'var(--primary-default)' : 'white',
            contentPadding: '12px 16px',
            zIndexPopup: 9999,
          },
          Form: {
            labelFontSize: 13,
            labelColor: 'var(--grey-60)',
            verticalLabelPadding: '0 0 8px',
          },
        },
      }}
    >
      <AntApp style={{ width: '100vw', height: '100dvh' }}>
        <RouterProvider router={Router} />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
