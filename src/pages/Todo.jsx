/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconListCheck } from 'assets/icon-list_check.svg';
import { CusModal } from 'components';
import { CusCollapse } from 'components/collapse';
import { useConfirmProps } from 'hooks';
import { useCollapse, useModalProps } from 'hooks/todo';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTodo, useGetTodoList } from 'services/todoService';
import { selectCommon } from 'store/commonSlice';
import { cssTodo } from './todoCss';

const Todo = () => {
  const { searchData } = useSelector(selectCommon);
  const [selectId, setSelectId] = useState('');
  const [openConfirm, setOpenConfirm] = useState('');
  const [rejectRemark, setRejectRemark] = useState('');
  const { data: todos, isSuccess, isLoading, error } = useGetTodoList();
  const {
    data: todoData,
    isSuccess: dataSuccess,
    isLoading: dataLoading,
  } = useGetTodo(selectId);
  const {
    bookItems,
    unUpdateItems,
    approveItems,
    rejectItems,
    onChangeCollapse,
    getItemsCount,
  } = useCollapse(setSelectId, todos);
  const [bookColl, setBookColl] = useState(bookItems[0]?.key || []);
  const [updateColl, setUpdateColl] = useState(unUpdateItems[0]?.key || []);
  const [approveColl, setApproveColl] = useState(approveItems[0]?.key || []);
  const [rejectColl, setRejectColl] = useState(rejectItems[0]?.key || []);

  const { mProps } = useModalProps(todoData, setOpenConfirm);
  const { confirmProps } = useConfirmProps(
    openConfirm,
    setOpenConfirm,
    setSelectId,
    rejectRemark,
    setRejectRemark
  );

  return (
    <Flex vertical align="center" css={cssTodo}>
      <CusModal
        open={!!selectId && dataSuccess}
        title={mProps?.title}
        isClose={mProps?.isClose}
        isFooter={mProps?.isFooter}
        onOk={mProps?.onOk}
        okStr={mProps?.okStr}
        onCancel={() => setSelectId('')}
        exFn={mProps?.exFn}
        exStr={mProps?.exStr}
        w={mProps.w}
        h={mProps.h}
        content={mProps?.content}
      />
      <CusModal
        open={!!openConfirm}
        title={confirmProps?.title}
        titleSize={20}
        onOk={confirmProps?.onOk}
        okStr={'核准'}
        exFn={confirmProps?.exFn}
        exStr={'退件'}
        onCancel={() => setOpenConfirm('')}
        cancelStr={'取消'}
        h={confirmProps?.h}
        content={confirmProps?.content}
      />
      <div className="todo-container">
        <div className="title">
          {searchData?.text
            ? `「${searchData?.text}」的搜尋結果`
            : '✨ 歡迎, 侯小吟'}
        </div>
        {todos ? (
          <Flex vertical gap={20} style={{ marginBottom: 24 }}>
            {!!getItemsCount(bookItems) && (
              <CusCollapse
                activeKey={bookColl}
                items={bookItems}
                onChange={(key) => onChangeCollapse(key, setBookColl)}
              />
            )}
            {!!getItemsCount(unUpdateItems) && (
              <CusCollapse
                activeKey={updateColl}
                items={unUpdateItems}
                onChange={(key) => onChangeCollapse(key, setUpdateColl)}
              />
            )}
            {!!getItemsCount(approveItems) && (
              <CusCollapse
                activeKey={approveColl}
                items={approveItems}
                onChange={(key) => onChangeCollapse(key, setApproveColl)}
              />
            )}
            {!!getItemsCount(rejectItems) && (
              <CusCollapse
                activeKey={rejectColl}
                items={rejectItems}
                onChange={(key) => onChangeCollapse(key, setRejectColl)}
              />
            )}
          </Flex>
        ) : (
          <Flex
            vertical
            justify="center"
            align="center"
            gap={20}
            className="nodata"
          >
            <IconListCheck />
            <div className="text">你可以在這裡接收相關的待辦事項</div>
          </Flex>
        )}
      </div>
    </Flex>
  );
};

export default Todo;
