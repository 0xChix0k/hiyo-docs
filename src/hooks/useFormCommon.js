const useFormCommon = () => {
  const requiredObj = {
    required: true,
    message: '必填',
  };
  const reqiuredFileObj = {
    required: true,
    message: '請上傳檔案',
  };

  return { requiredObj, reqiuredFileObj};
};

export { useFormCommon };
