import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { FormSetContent } from 'components/modal/content';
import { useFormCommon } from '..';
import { useMessage } from 'hooks';

const useFormProps = (
  refs,
  id,
  data,
  setData,
  setOpen,
  level,
  setLevel,
  initData
) => {
  const { onValidate } = useFormCommon();
  const { openMes } = useMessage();
  const handleChlick = async (exFn) => {
    const isForm0Valid = await onValidate(refs[0], null);
    console.log('isForm0Valid', isForm0Valid);
    if (isForm0Valid) {
      console.log('exFn');
      await exFn();
    }
  };

  const handleClose = () => {
    setData(initData);
    setOpen({ open: false, id: null });
  };

  const props = {
    title: id
      ? { text: '編輯表單', icon: <IconForm /> }
      : { text: '新增表單', icon: <IconForm /> },
    isClose: true,
    onOk:
      level === 1
        ? () =>
            handleChlick(() => onValidate(refs[1], () => setLevel(level + 1)))
        : level === 2
        ? () =>
            handleChlick(() => onValidate(refs[2], () => setLevel(level + 1)))
        : level === 3
        ? () =>
            handleChlick(() =>
              onValidate(refs[3], () => {
                // set update Api
                handleClose();
                openMes(id ? '已成功更新！' : '已成功新增！');
              })
            )
        : null,
    okStr: level === 3 ? '儲存' : '繼續',
    okBgColor: level === 3 ? '#07CE6F' : '#2D336B',
    onCancel: () => handleClose(),
    exFn: [2, 3].includes(level) ? () => setLevel(level - 1) : null,
    exType: 'text',
    exStr: '上一步',
    exBgColor: '',
    w: 700,
    h: 750,
    content: (
      <FormSetContent refs={refs} level={level} data={data} setData={setData} />
    ),
  };

  return { props };
};
export { useFormProps };
