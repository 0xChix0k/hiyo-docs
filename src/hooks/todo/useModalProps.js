import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import {
  DocContent,
  FormContent,
  UpdateContent,
} from 'components/modal/content';
import { useStatus } from 'hooks';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';

/**
 * @description useModalProps
 * @param {Array} data
 * @returns {Object}
 */
const useModalProps = (data, setOpenConfirm) => {
  const { userInfo } = useSelector(selectUser);
  const { getText, getColor } = useStatus();
  const status = data?.Status;

  const mProps = {
    title: ['book', 'update'].includes(status)
      ? { text: '', icon: <IconForm /> }
      : ['pending', 'rejected'].includes(status)
      ? {
          text: data?.No,
          icon: <IconForm />,
          sStr: getText(status),
          sColor: getColor(status),
        }
      : { text: '', icon: null },
    isClose: true,
    isFooter: status === 'book' ? false : true,
    onOk:
      status === 'update'
        ? () => console.log('記錄更新')
        : status === 'pending'
        ? () => setOpenConfirm('approve')
        : status === 'rejected'
        ? () => setOpenConfirm('approve')
        : null,
    okStr:
      status === 'update'
        ? '記錄更新'
        : status === 'pending'
        ? '核准'
        : status === 'rejected'
        ? '重新提交'
        : '確定',
    exFn: status === 'pending' ? () => setOpenConfirm('reject') : null,
    exStr: status === 'pending' ? '退件' : '',
    w: ['pending', 'rejected'].includes(status) ? 800 : 450,
    h:
      status === 'book'
        ? 640
        : status === 'update'
        ? 470
        : ['pending', 'rejected'].includes(status)
        ? 661
        : 240,
    content:
      status === 'book' ? (
        <DocContent isMa={userInfo.role === 'manager'} docData={data} />
      ) : status === 'update' ? (
        <UpdateContent data={data} />
      ) : ['pending', 'rejected'].includes(status) ? (
        <FormContent data={data} />
      ) : null,
  };

  return { mProps };
};

export { useModalProps };
