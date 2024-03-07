import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import formFolder from 'data/formFolder.json';

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
      // staleTime: 0,
      // cacheTime: 0,
      // keepPreviousData: true,
    }
  );
};
