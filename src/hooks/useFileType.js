import { ReactComponent as IconDoc } from 'assets/files/icon_doc_fills.svg';
import { ReactComponent as IconImg } from 'assets/files/icon_image_fills.svg';
import { ReactComponent as IconPDF } from 'assets/files/icon_pdf_fills.svg';
import { ReactComponent as IconPpt } from 'assets/files/icon_ppt_fills.svg';
import { ReactComponent as IconUnKnow } from 'assets/files/icon_unknown_fills.svg';
import { ReactComponent as IconVideo } from 'assets/files/icon_video_fills.svg';
import { ReactComponent as IconExcel } from 'assets/files/icon_xls_fills.svg';

const useFileType = () => {
  const typePdf = ['application/pdf'];
  const typeImg = ['image/jpeg', 'image/png', 'image/jpg'];
  const typeExcel = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
  ];
  const typeWord = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ];
  const typePowerPoint = [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
  ];
  const typeVideo = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/mpeg',
  ];

  const typeAll = [
    ...typePdf,
    ...typeImg,
    ...typeExcel,
    ...typeWord,
    ...typePowerPoint,
    ...typeVideo,
  ];

  const onGetFileIcon = (fileName) => {
    const fileExt = fileName.split('.').pop().toLowerCase();
    if (fileExt === 'pdf') {
      return IconPDF;
    } else if (['jpg', 'jpeg', 'png'].includes(fileExt)) {
      return IconImg;
    } else if (['doc', 'docx'].includes(fileExt)) {
      return IconDoc;
    } else if (['xls', 'xlsx'].includes(fileExt)) {
      return IconExcel;
    } else if (['ppt', 'pptx'].includes(fileExt)) {
      return IconPpt;
    } else if (['mp4', 'wmv', 'mov'].includes(fileExt)) {
      return IconVideo;
    } else {
      return IconUnKnow;
    }
  };

  return {
    typePdf,
    typeImg,
    typeExcel,
    typeWord,
    typePowerPoint,
    typeVideo,
    typeAll,
    onGetFileIcon,
  };
};

export { useFileType };
