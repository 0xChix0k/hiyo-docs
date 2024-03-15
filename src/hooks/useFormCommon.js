/**
 * @description Forms Common Function
 * @returns  {Object} {requiredObj, fileRules, onValidate}
 */
const useFormCommon = () => {
  const requiredObj = {
    required: true,
    message: '必填',
  };
  const fileRules = [
    {
      required: true,
      message: '請上傳檔案',
      type: 'array',
    },
  ];

  /**
   * @description 表單驗證
   * @param {ref} formRef
   * @param {Function} exfn
   * @returns {boolean}
   */
  const onValidate = async (formRef, exfn = null) => {
    try {
      await formRef.current.validateFields(); // 驗證表單
      // 表單驗證通過
      formRef.current.submit(); // 提交表單
      exfn && exfn();
      return true;
    } catch (error) {
      // 表單驗證未通過
      console.log('表單驗證未通過:', error);
      return false;
    }
  };

  return { requiredObj, fileRules, onValidate };
};

export { useFormCommon };
