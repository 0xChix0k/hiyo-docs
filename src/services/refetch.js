import { useQueryClient } from 'react-query';

export const useReFetch = (keys) => {
  const queryClient = useQueryClient();
  return () => {
    keys.map((key) => queryClient.refetchQueries(key, { force: true }));
  };
};

export const useReFetchId = (key, id) => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.refetchQueries({ queryKey: [key, id] }, { force: true });
  };
};

export const useReFetchPage = (key, pageSize, searchStr) => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.refetchQueries({ queryKey: [key, searchStr, pageSize] });
  };
};
