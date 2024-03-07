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
  const onSearch = (newSreachData, setOpenFilter) => {
    dispatch(setAllSearchData(newSreachData));
    setOpenFilter && setOpenFilter(false);
    console.log('searchData:', newSreachData);
  };

  const isFiltered = (data) => {
    return (
      data.from ||
      data.typeId !== 'all' ||
      data.formId !== 'all' ||
      data.dateId !== 'all' ||
      data.sDate ||
      data.eDate
    );
  };

  const isSearched =
    searchData.text ||
    searchData.from ||
    searchData.typeId !== 'all' ||
    searchData.formId !== 'all' ||
    searchData.dateId !== 'all' ||
    searchData.sDate ||
    searchData.eDate;

  return { onInputSearch, onSearchItem, onSearch, isFiltered, isSearched };
};

export { useSearch };
