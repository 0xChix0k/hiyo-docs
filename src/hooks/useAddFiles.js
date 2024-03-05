import { useCallback } from 'react';
import { useFileType } from './useFileType';

const useAddFiles = () => {
  const { typeAll } = useFileType();
  /**
   * @description add a file
   * @param {object} event
   * @param {Array} files
   * @param {function} setFiles
   * @returns {void}
   */
  const onAddFile = useCallback(
    (event, files, setFiles, setIsLocalFile=null, checkTypes = typeAll) => {
      // const files = event.target.files;
      const filesCount = event.target.files.length;
      //大於1個檔案或沒檔案不處理
      if (filesCount === 0 || filesCount > 1) return;
      const file = event.target.files[0];
      //檔案類型不符合不處理
      if (!checkTypes.some((item) => item === file.type)) return;
      // console.log('file', file);
      // 防止重複上傳
      if (files.some((item) => item.Id === file.lastModified)) {
        event.target.value = '';
        return;
      } else {
      setFiles([...files, file]);
      // 限制只能一個檔案
      // setFiles([file]);
      setIsLocalFile && setIsLocalFile(true);
      // 重置 input 檔案輸入，以防相同檔案無法上傳
      event.target.value = '';
      }
    },
    [typeAll]
  );

  return { onAddFile };
};

export { useAddFiles };
