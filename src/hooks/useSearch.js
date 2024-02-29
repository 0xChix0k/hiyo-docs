import { useDispatch, useSelector } from 'react-redux';
import {
  selectCommon,
  setAllSearchData,
  setSearchData,
} from 'store/commonSlice';

const useSearch = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector(selectCommon);

  /**
   * @description input search
   * @param {string} value
   */
  const onInputSearch = (value) => {
    const newData = { ...searchData, text: value };
    onSearch(newData);
  };

  /**
   * @description change search item
   * @param {string} filed
   * @param {string} value
   */
  const onSearchItem = (filed, value) => {
    dispatch(setSearchData({ field: filed, value: value }));
  };

  /**
   * @description search data
   * @returns {void}
   */
  const onSearch = (newSreachData) => {
    dispatch(setAllSearchData(newSreachData));
  };

  return { onInputSearch, onSearchItem, onSearch };
};

export { useSearch };
