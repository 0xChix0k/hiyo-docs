import { App as AntApp, ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from 'store';
import Router from './router/Router';
import SEO from './seo'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEO />
      <Provider store={store}>
        <ConfigProvider
          autoInsertSpaceInButton={false} //移除两个汉字之间的空格
          theme={{
            components: {
              Message: {
                contentBg: '#EEFFF5',
                contentPadding: '12px 16px',
                zIndexPopup: 9999,
              },
            },
          }}
        >
          <AntApp>
            <RouterProvider router={Router} />
          </AntApp>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
