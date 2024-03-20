import { useMutation } from 'react-query';
import apiClient from './apiClient';

const ApiUrl = `/authenticate`;

/**
 * @param {object} inputData={EmpNo, Password,CompanyNo}
 * @returns {object}
 */
export const usePostLogin = () => {
  return useMutation(async (inputData) => {
    const { data } = await apiClient.post(`${ApiUrl}`, inputData, {
      skipAuthCheck: true,
    });
    return data;
  });
};
