import { useQuery } from 'react-query';
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
