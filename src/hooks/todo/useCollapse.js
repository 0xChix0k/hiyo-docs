import Icon, { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactComponent as IconApprove } from 'assets/icon-approve.svg';
import { ReactComponent as IconBook } from 'assets/icon-book.svg';
import { ReactComponent as IconReject } from 'assets/icon-reject.svg';
import { ReactComponent as IconUpdate } from 'assets/icon-upadte.svg';

/**
 * @description useCollapse
 * @param {Function} setSelectId
 * @param {Object} data
 * @returns  {Object}
 */
const useCollapse = (selectId, setSelectId, data, loading) => {
  /**
   * @description getFilterData
   * @param {string} status
   * @returns
   */
  const getFilterData = (status) => {
    return data
      ?.filter((item) => item.Status === status)
      .map((item) => {
        return (
          <Flex
            align="center"
            justify="space-between"
            key={item.Id}
            onClick={loading ? null : () => setSelectId(item.Id)}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {item.Name}
            {loading && selectId && selectId === item?.Id && (
              <Icon
                component={LoadingOutlined}
                style={{ color: 'var(--primary-default)' }}
              />
            )}
          </Flex>
        );
      });
  };

  const bookItems = [
    {
      key: 'book',
      label: (
        <Flex gap={16} align="center">
          <IconBook />
          待閱讀
        </Flex>
      ),
      children: getFilterData('book'),
    },
  ];
  const unUpdateItems = [
    {
      key: 'update',
      label: (
        <Flex gap={16} align="center">
          <IconUpdate />
          待更新
        </Flex>
      ),
      children: getFilterData('update'),
    },
  ];
  const approveItems = [
    {
      key: 'pending',
      label: (
        <Flex gap={16} align="center">
          <IconApprove />
          待簽核
        </Flex>
      ),
      children: getFilterData('pending'),
    },
  ];
  const rejectItems = [
    {
      key: 'rejected',
      label: (
        <Flex gap={16} align="center">
          <IconReject />
          你有退件
        </Flex>
      ),
      children: getFilterData('rejected'),
    },
  ];

  /**
   * @description onChangeCollapse
   * @param {string[]} key
   * @param {Function} setColl
   * @returns {void}
   */
  const onChangeCollapse = (key, setColl) => {
    setColl(key);
  };

  /**
   * @description getItemsCount
   * @param {Array} items
   * @returns {number}
   */
  const getItemsCount = (items) => {
    return items.reduce((acc, cur) => {
      return acc + cur.children?.length;
    }, 0);
  };

  return {
    bookItems,
    unUpdateItems,
    approveItems,
    rejectItems,
    onChangeCollapse,
    getItemsCount,
  };
};

export { useCollapse };
