import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import myFormList from 'data/myForm.json';
import { useCommon } from 'hooks';

export const useGetMyForms = (param) => {
  const { isDateBetween } = useCommon();
  return useQuery(
    ['myFormList', param],
    async () => {
      // console.log('param:', param);
      const data = myFormList.filter(
        (item) =>
          item.Status === param.status &&
          isDateBetween(param.sDate, param.eDate, item.PostDate)
      );
      // console.log('myForm list:', data);
      return data;
    },
    {
      // enabled: action === 'task',
      // staleTime: 0,
      // cacheTime: 0,
      // keepPreviousData: true,
    }
  );
};

/**
 * @description useGetMyForm
 * @param {string|number} id
 * @returns {object}
 */
export const useGetMyForm = (id) => {
  return useQuery(
    ['myFormData', id],
    async () => {
      const data = myFormList.find((item) => item.Id === id);
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
