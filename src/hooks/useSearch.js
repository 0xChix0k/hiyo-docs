import { useDispatch } from 'react-redux';
import { setSearchStr } from 'store/commonSlice';

const useSearch = () => {
  const dispatch = useDispatch();


  /**
   * @description search input event
   * @param {string} value 
   * @returns {void}
   */
  const onSearch = (value) => {
    dispatch(setSearchStr(value));
  };

  return { onSearch };
};

export { useSearch };
