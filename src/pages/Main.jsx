import { Flex } from 'antd';
import { Header } from 'components';
import { useSearch } from 'hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGetForms, useGetTypes } from 'services/dropdownService';
import { setForms, setTypes } from 'store/dropdownSlice';
import { setUser } from 'store/userSlice';
import Result from './Result';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: types, isSuccess: typeSuccess } = useGetTypes();
  const { data: forms, isSuccess: formSuccess } = useGetForms();

  useEffect(() => {
    if (typeSuccess) {
      dispatch(setTypes(types));
    }

    if (formSuccess) {
      dispatch(setForms(forms));
    }
    dispatch(setUser(JSON.parse(localStorage.getItem('UserInfo'))));
  }, [typeSuccess, dispatch, types, formSuccess, forms]);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/todo');
    }
  }, [location.pathname, navigate]);

  const { isSearched } = useSearch();

  return (
    <Flex vertical style={{ width: '100%', height: '100%' }}>
      <Header />
      <Flex vertical flex={'1 1 auto'} style={{ overflowY: 'hidden' }}>
        {isSearched ? <Result /> : <Outlet />}
      </Flex>
    </Flex>
  );
};
export default Main;
