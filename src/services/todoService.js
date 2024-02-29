import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import todoList from 'data/todolist.json';

export const useGetTodoList = () => {
  return useQuery(
    'todoList',
    async () => {
      // console.log('todoList:', todoList);
      return todoList;
    },
    {
      // staleTime: HOUR_FOR_SEC,
    }
  );
};

export const useGetTodo = (id) => {
  return useQuery(
    ['todoData', id],
    async () => {
      const data = todoList.find((item) => item.Id === id);
      console.log('todoData', data);
      return data;
    },
    {
      enabled: !!id,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};
