import { RenameContent } from 'components/modal/content';

const useEditProps = (ref, exAction, setId, setAdd) => {
  const editProps = {
    title: exAction.action === 'delete' ? { text: '是否確認刪除此類別' } : {},
    titleSize: 20,
    onOk: () => console.log('ok', exAction.action),
    okStr: exAction.action === 'delete' ? '刪除' : '儲存',
    onCancel: () => {
      setId('');
      setAdd(false);
    },
    cancelStr: '取消',
    w: 350,
    h: 180,
    placement: exAction.place,
    content:
      exAction.action === 'delete' ? (
        <></>
      ) : (
        <RenameContent formInstance={ref} name={exAction.fName} />
      ),
  };

  return { editProps };
};

export { useEditProps };
