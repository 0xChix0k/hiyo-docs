import { ReactComponent as IconForm } from 'assets/icon-form.svg';

const useFormProps = (ref, id, setOpen, level, setLevel) => {
  const props = {
    title: id
      ? { text: '編輯表單', icon: <IconForm /> }
      : { text: '新增表單', icon: <IconForm /> },
    isClose: true,
    onOk:
      level === 3
        ? () => console.log('儲存表單')
        : () => {
            console.log('前往Level:', level + 1);
            setLevel(level + 1);
          },
    okStr: level === 3 ? '儲存' : '繼續',
    onCancel: () => setOpen({ open: false, id: null }),
    w: 700,
    h: 750,
    content: level === 1 ? <>1</> : level === 2 ? <>2</> : <>3</>,
  };

  return { props };
};
export { useFormProps };
