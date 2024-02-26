import { Flex } from 'antd';
import { ReactComponent as IconApprove } from 'assets/icon-approve.svg';
import { ReactComponent as IconBook } from 'assets/icon-book.svg';
import { ReactComponent as IconReject } from 'assets/icon-reject.svg';
import { ReactComponent as IconUpdate } from 'assets/icon-upadte.svg';
import TodoList from 'data/TodoList';

/**
 * @description useCollapse
 * @param {Function} setSelectId
 * @returns  {Object}
 */
const useCollapse = (setSelectId) => {
  const { bookList } = TodoList();
  const bookItems = [
    {
      key: 'book',
      label: (
        <Flex gap={16} align="center">
          <IconBook />
          待閱讀
        </Flex>
      ),
      children: bookList.map((item) => {
        return (
          <div key={item.Id} onClick={() => setSelectId(item.Id)}>
            {item.Comment}
          </div>
        );
      }),
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
      children: [<div>test</div>],
    },
  ];
  const approveItems = [
    {
      key: 'approve',
      label: (
        <Flex gap={16} align="center">
          <IconApprove />
          待簽核
        </Flex>
      ),
      children: [<div>test</div>],
    },
  ];
  const rejectItems = [
    {
      key: 'reject',
      label: (
        <Flex gap={16} align="center">
          <IconReject />
          你有退件
        </Flex>
      ),
      children: [<div>test</div>],
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

  /**
   * @description getAllCount
   * @returns {number}
   */
  const getAllCount = () => {
    return (
      getItemsCount(bookItems) +
      getItemsCount(unUpdateItems) +
      getItemsCount(approveItems) +
      getItemsCount(rejectItems)
    );
  };

  return {
    bookItems,
    unUpdateItems,
    approveItems,
    rejectItems,
    onChangeCollapse,
    getItemsCount,
    getAllCount,
  };
};

export { useCollapse };
