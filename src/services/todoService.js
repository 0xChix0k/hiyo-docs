import { useQuery } from 'react-query';
// import apiClient from './apiClient';
import todoList from 'data/todolist.json';

/**
 * @description useGetTodoList
 * @returns {Array<object>}
 */
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

/**
 * @description useGetTodo
 * @param {string|number} id
 * @returns {object}
 */
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
