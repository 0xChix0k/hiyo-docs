import { useMutation, useQuery } from 'react-query';
// import apiClient from './apiClient';
import companys from 'data/dropdown/company.json';

/**
 * @description useGetCompany
 * @param {string|number} id
 * @returns {object}
 */
export const useGetCompany = (id) => {
  return useQuery(
    ['companyList', id],
    async () => {
      const data = companys.filter((item) => item.Member.some((i) => i === id));
      // console.log('myFormList', data);
      return data;
    },
    {
      enabled: !!id,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

/**
 * @param {object} inputData={UserId, Password}
 * @returns {object}
 */
export const usePostLogin = () => {
  return useMutation(async (inputData) => {
    // const { data } = await apiClient.post(`${ApiUrl}`, inputData, {
    //   skipAuthCheck: true,
    // });
    // return data;

    if (inputData.UserId === 'hiyo' && inputData.Password === '000') {
      return { success: true, message: '登入成功' };
    } else {
      throw new Error('帳號或密碼錯誤');
    }
  });
};
