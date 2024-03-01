import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import dates from 'data/dropdown/dates.json';
import forms from 'data/dropdown/form.json';
import types from 'data/dropdown/types.json';

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

export const useGetForms = () => {
  return useQuery(
    'formOptions',
    async () => {
      // console.log('todoList:', todoList);
      return forms;
    },
    {
      // staleTime: HOUR_FOR_SEC,
    }
  );
};
