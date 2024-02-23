import { App as AntApp, ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from 'store';
import Meta from './Meta';
import Router from './router/Router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Meta />
      <Provider store={store}>
        <ConfigProvider
          autoInsertSpaceInButton={false} //移除两个汉字之间的空格
          theme={{
            token: {
              colorError: '#ef4564',
            },
            components: {
              Message: {
                contentBg: '#EEFFF5',
                contentPadding: '12px 16px',
                zIndexPopup: 9999,
              },
            },
          }}
        >
          <AntApp style={{ width: '100vw', height: '100dvh' }}>
            <RouterProvider router={Router} />
          </AntApp>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
