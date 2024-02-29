import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import types from 'data/dropdown/types.json';
import dates from 'data/dropdown/dates.json';

export const useGetTypes = () => {
  return useQuery(
    'typeOptions',
    async () => {
      // console.log('todoList:', todoList);
      return types;
    },
    {
      // staleTime: HOUR_FOR_SEC,
    }
  );
};

export const useGetDates = () => {
  return useQuery(
    'dateOptions',
    async () => {
      // console.log('todoList:', todoList);
      return dates;
    },
    {
      // staleTime: HOUR_FOR_SEC,
    }
  );
};

