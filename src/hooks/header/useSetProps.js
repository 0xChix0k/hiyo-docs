import { SetContent } from 'src/components/modal/content';
import { useMessage } from 'src/hooks';

/**
 * @description Profile setting Modal props
 * @param {ref} ref
 * @param {Function} setOpen
 * @returns {Object} setPrrops
 */
const useSetProps = (ref, setOpen) => {
  const { openMes } = useMessage();

  const setPrrops = {
    title: { text: '設定' },
    isClose: true,
    onOk: () => {
      console.log('ok');
      setOpen(false);
      openMes('儲存成功!');
    },
    okStr: '儲存',
    onCancel: () => setOpen(false),
    w: 850,
    h: 750,
    content: <SetContent formInstance={ref} />,
  };
  return { setPrrops };
};
export { useSetProps };
