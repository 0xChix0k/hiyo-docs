import { useQuery } from 'react-query';
import apiClient from './apiClient';

import forms from 'data/dropdown/form.json';
import types from 'data/dropdown/types.json';
import users from 'data/dropdown/users.json';

const ApiUrl = `/dropdown`;

export const fetchCompanys = async (str) => {
  const { data } = await apiClient.get(`${ApiUrl}/login-company-list/${str}`);
  return data;
};

/**
 * @description useGetCompanys
 * @param {string} str
 * @returns {object}
 */
export const useGetCompanys = (str) => {
  return useQuery(
    ['companyList', str],
    async () => {
      const { data } = await apiClient.get(
        `${ApiUrl}/login-company-list/${str}`,
        {
          skipAuthCheck: true,
        }
      );
      return data;
    },
    {
      enabled: !!str,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

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

/**
 * @description useGetUsers
 * @param {string|number} id
 * @returns {object}
 */
export const useGetUsers = (searchStr) => {
  return useQuery(
    ['usersList', searchStr],
    async () => {
      // console.log('searchStr:', searchStr);
      const data = users.filter(
        (item) =>
          item.Name.toLowerCase().includes(searchStr.toLowerCase()) ||
          item.Dep.toLowerCase().includes(searchStr.toLowerCase())
      );
      // console.log('myFormList', data);
      return data;
    },
    {
      enabled: !!searchStr,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};
