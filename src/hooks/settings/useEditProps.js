import { RenameContent } from 'components/modal/content';

const useEditProps = (ref, exAction, setId) => {
  const editProps = {
    title: exAction.action === 'rename' ? {} : { text: '是否確認刪除此類別' },
    titleSize: 20,
    onOk: () => console.log('ok', exAction.action),
    okStr: exAction.action === 'rename' ? '儲存' : '刪除',
    onCancel: () => setId(''),
    cancelStr: '取消',
    w: 350,
    h: 180,
    content:
      exAction.action === 'rename' ? (
        <RenameContent formInstance={ref} name={exAction.fName} />
      ) : (
        <></>
      ),
  };

  return { editProps };
};

export { useEditProps };
