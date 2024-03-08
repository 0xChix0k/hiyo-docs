import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import formFolder from 'data/formFolder.json';
import formForms from 'data/formForms.json';

const TIME = 1000 * 60 * 10;
export const useGetFolders = () => {
  return useQuery(
    ['folderList'],
    async () => {
      // console.log('param:', param);
      const data = formFolder;
      console.log('formFolder list:', data);
      return data;
    },
    {
      // enabled: action === 'task',
      staleTime: TIME,
      cacheTime: TIME,
      keepPreviousData: true,
    }
  );
};

/**
 * @description useGetForms
 * @param {string|number} id
 * @returns {object}
 */
export const useGetForms = (id) => {
  return useQuery(
    ['folderFormList', id],
    async () => {
      const data = id === '1' ? formForms : [];
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
