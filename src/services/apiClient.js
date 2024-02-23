import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;
// 創建一個 axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});


// 在每一次的請求中加入 JWT
apiClient.interceptors.request.use(
  (config) => {
    if (config.skipAuthCheck) {
      return config; // 如果设置了跳过身份验证检查的标志，则直接返回配置
    }

    const Jwt = Cookies.get('Jwt');
    if (Jwt) {
      config.headers.Authorization = `Bearer ${Jwt}`;
    } else {
      // 如果Jwt不存在，重定向到登录页面
      window.location.href = '/login';
      return Promise.reject(new Error('No authentication token found')); // 拒绝进一步处理这个请求
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 在每一次的回應中檢查狀態碼並處理 401 錯誤
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
