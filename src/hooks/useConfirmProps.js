import { RejectContent } from 'components/modal/content';
import { useRef } from 'react';
import { useFormCommon } from './useFormCommon';
import { useMessage } from './useMessage';

const useConfirmProps = (
  confirmType,
  setConfirm,
  setSelectId,
  rejRemark = '',
  rejSetMark = null
) => {
  const formRef = useRef(null);
  const { onValidate } = useFormCommon();
  const { openMes } = useMessage();
  const isApprove = confirmType === 'approve';
  const confirmProps = {
    title: {
      text: `你即將${isApprove ? '核准' : '退回'}這份申請`,
    },
    onOk: isApprove
      ? () => {
          console.log('核准');
          setSelectId('');
          setConfirm('');
          openMes('已完成處理！');
        }
      : null,
    exFn:
      !isApprove && !!confirmType
        ? () =>
            onValidate(formRef, () => {
              console.log('退件');
              setSelectId('');
              setConfirm('');
              openMes('已完成處理！');
            })
        : null,
    h: !isApprove && !!confirmType ? 350 : 240,
    content:
      !isApprove && !!confirmType ? (
        <RejectContent
          formInstance={formRef}
          remark={rejRemark}
          setRemark={rejSetMark}
        />
      ) : null,
  };

  return { confirmProps };
};

export { useConfirmProps };
