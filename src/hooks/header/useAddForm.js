import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { useFormCommon } from 'hooks';
import { FormContent } from 'components/modal/content';

const useAddForm = (ref, setOpen, formData, setFormData, initForm) => {
  const { onValidate } = useFormCommon();

  const addModalProps = {
    title: { text: '新表單', icon: <IconForm /> },
    isClose: true,
    onOk: () =>
      onValidate(ref, () => {
        console.log('新增表單');
        setOpen(false);
      }),
    okStr: '提交',
    onCancel: () => {
      setFormData(initForm);
      setOpen(false);
    },
    w: 800,
    h: 661,
    content: (
      <FormContent formInstance={ref} data={formData} setData={setFormData} />
    ),
  };

  return { addModalProps };
};

export { useAddForm };
