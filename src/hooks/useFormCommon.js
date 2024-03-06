const useFormCommon = () => {
  const requiredObj = {
    required: true,
    message: '必填',
  };
  const fileRules = [
    {
      required: true,
      message:'請上傳檔案',
      type: 'array'
    }
  ];

  const onValidate = async (formRef, exfn = null) => {
    try {
      await formRef.current.validateFields(); // 驗證表單
      // 表單驗證通過
      formRef.current.submit(); // 提交表單
      exfn && exfn();
    } catch (error) {
      // 表單驗證未通過
      console.log('表單驗證未通過:', error);
    }
  };

  return { requiredObj, fileRules, onValidate };
};

export { useFormCommon };
