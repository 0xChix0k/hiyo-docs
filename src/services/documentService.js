import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import formFolder from 'data/formFolder.json';
import docFolders from 'data/docFolders.json';
import formForms from 'data/formForms.json';

const TIME = 1000 * 60 * 10;
export const useGetFolders = () => {
  return useQuery(
    ['docfolderList'],
    async () => {
      // console.log('param:', param);
      const data = formFolder;
      // console.log('formFolder list:', data);
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
export const useGetFolder = (id) => {
  return useQuery(
    ['docfolder', id],
    async () => {
      const data = docFolders.find((item) => item.Id === id);
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
 * @description useGetFormInfo
 * @param {string|number} id
 * @returns {object}
 */
export const useGetFormData = (id) => {
  return useQuery(
    ['folderFormData', id],
    async () => {
      const data = formForms.find((item) => item.FormId === id);
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
