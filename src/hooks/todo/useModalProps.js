import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { DocContent, UpdateContent } from 'components/modal/content';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';

/**
 * @description useModalProps
 * @param {Array} data
 * @returns {Object}
 */
const useModalProps = (data) => {
  const { userInfo } = useSelector(selectUser);
  const status = data?.Status;

  const mProps = {
    title: ['book', 'update'].includes(status)
      ? { text: '', icon: <IconForm /> }
      : { text: '', icon: null },
    isClose: true,
    isFooter: status === 'book' ? false : true,
    onOk: status === 'update' ? () => console.log('記錄更新') : null,
    okStr: status === 'update' ? '記錄更新' : '確定',
    h: status === 'book' ? 640 : status === 'update' ? 470 : 240,
    content:
      status === 'book' ? (
        <DocContent isMa={userInfo.role === 'manager'} docData={data} />
      ) : status === 'update' ? (
        <UpdateContent data={data} />
      ) : null,
  };

  return { mProps };
};

export { useModalProps };
