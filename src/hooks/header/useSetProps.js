import { SetContent } from 'src/components/modal/content';
const useSetProps = (ref, setOpen) => {
  const setPrrops = {
    title: { text: '設定' },
    isClose: true,
    onOk: () => console.log('ok'),
    okStr: '儲存',
    onCancel: () => setOpen(false),
    w: 850,
    h: 750,
    content: <SetContent formInstance={ref} />,
  };
  return { setPrrops };
};
export { useSetProps };
