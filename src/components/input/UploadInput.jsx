import { forwardRef } from 'react';

/**
 * @description Upload Input
 * @param {object} props
 * @param {string} accept
 * @param {function} onChange
 * @param {Ref} ref
 * @returns {JSX.Element}
 */
const UploadInput = forwardRef((props, ref) => {
  const { accept = '.doc, .docx, .pdf, .xls, .xlsx', onChange } = props;
  return (
    <input
      type="file"
      // multiple
      ref={ref}
      accept={accept}
      onChange={(event) =>
        // onAddFile(event, files, setFiles, setIsLocalFile, typeWord)
        // console.log('file', event.target.files[0])
        onChange(event)
      }
      style={{ display: 'none' }}
    />
  );
});
export { UploadInput };
