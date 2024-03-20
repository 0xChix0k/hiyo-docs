import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';

const useCommon = () => {
  const { userInfo } = useSelector(selectUser);

  const IS_SUPER_ADMIN = userInfo.Roles.includes('SuperAdmin');

  /**
   * @description Empty column for table
   */
  const EMPRTY_COLUMN = {
    title: ' ',
    dataIndex: 'empty',
    key: 'empty',
    width: 20,
    // fixed: 'left',
  };

  /**
   * @description Format date to string
   * @param {dayjs} dateObj
   * @returns  {string}
   */
  const dFormat = (dateObj) => {
    return dateObj.format('YYYY-MM-DD');
  };

  /**
   * @description Check if date is between two dates
   * @param {string} startDateStr
   * @param {string} endDateStr
   * @param {string} dateToCheckStr
   * @returns {boolean}
   */
  function isDateBetween(startDateStr, endDateStr, dateToCheckStr) {
    const startDate = dayjs(startDateStr);
    const endDate = dayjs(endDateStr);
    const dateToCheck = dayjs(dateToCheckStr);

    return (
      (dateToCheck.isAfter(startDate) || dateToCheck.isSame(startDate)) &&
      (dateToCheck.isBefore(endDate) || dateToCheck.isSame(endDate))
    );
  }

  /**
   * @description Get name by id
   * @param {string|number} value
   * @param {Array<object>} data
   * @param {string|number} id="Id"
   * @param {string} name="Name"
   * @returns
   */
  const getNameById = (value, data, id = 'Id', name = 'Name') => {
    return value && data ? data.find((item) => item[id] === value)[name] : '';
  };

  /**
   * @description Debounce function
   * @param {string} value
   * @param {function} fn
   * @returns {void}
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((value, fn) => {
      fn(value);
    }, 500),
    []
  );

  return {
    IS_SUPER_ADMIN,
    EMPRTY_COLUMN,
    dFormat,
    isDateBetween,
    getNameById,
    debounceFn,
  };
};
export { useCommon };
