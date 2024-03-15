import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { useFormCommon } from 'hooks';
import { FormContent } from 'components/modal/content';

/**
 * @description Add Form Modal props
 * @param {ref} ref
 * @param {Function} setOpen
 * @param {object} formData
 * @param {Function} setFormData
 * @param {object} initForm
 * @returns {Object} props
 */
const useAddForm = (ref, setOpen, formData, setFormData, initForm) => {
  const { onValidate } = useFormCommon();

  const addModalProps = {
    title: { text: '新增申請', icon: <IconForm /> },
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
