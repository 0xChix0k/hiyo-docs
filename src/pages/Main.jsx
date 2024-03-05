import { Flex } from 'antd';
import { Header } from 'components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  useGetDates,
  useGetForms,
  useGetTypes,
} from 'services/dropdownService';
import { setDates, setForms, setTypes } from 'store/dropdownSlice';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: types, isSuccess: typeSuccess } = useGetTypes();
  const { data: dates, isSuccess: dateSuccess } = useGetDates();
  const { data: forms, isSuccess: formSuccess } = useGetForms();

  useEffect(() => {
    if (typeSuccess) {
      dispatch(setTypes(types));
    }
    if (dateSuccess) {
      dispatch(setDates(dates));
    }
    if (formSuccess) {
      dispatch(setForms(forms));
    }
  }, [typeSuccess, dateSuccess, dispatch, types, dates, formSuccess, forms]);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/todo');
    }
  });

  return (
    <Flex vertical style={{ width: '100%', height: '100%' }}>
      <Header />
      <Flex vertical flex={'1 1 100%'} style={{ overflowY: 'auto' }} >
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default Main;
