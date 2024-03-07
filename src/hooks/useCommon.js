import dayjs from 'dayjs';

const useCommon = () => {
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
    const item = data.find((item) => item[id] === value);
    return item ? item[name] : '';
  };

  return { EMPRTY_COLUMN, dFormat, isDateBetween, getNameById };
};
export { useCommon };
