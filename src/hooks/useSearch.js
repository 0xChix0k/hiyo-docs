import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCommon,
  setAllSearchData,
  setSearchData,
} from 'store/commonSlice';

const useSearch = () => {
  const dispatch = useDispatch();
  // const { debounce } = useCommon();
  const { searchData } = useSelector(selectCommon);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((value) => {
      dispatch(setAllSearchData({ ...searchData, text: value }));
      console.log('searchData:', value);
    }, 500),
    []
  );

  /**
   * @description input search
   * @param {string} value
   */
  const onInputSearch = (value) => {
    if (value) {
      debounceFn(value);
    } else {
      dispatch(setAllSearchData({ ...searchData, text: value }));
    }
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
