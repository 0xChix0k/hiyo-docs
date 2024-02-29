import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import readersList from 'data/readers.json';

export const useGetReaders = (id) => {
  return useQuery(
    ['readersList', id],
    async () => {
      console.log('todo id:', id);
      const data = readersList.find((item) => item.Id === id);
      console.log('readers data:', data);
      return data;
    },
    {
      enabled: !!id,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};
