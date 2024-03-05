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

  return {
    typePdf,
    typeImg,
    typeExcel,
    typeWord,
    typePowerPoint,
    typeVideo,
    typeAll,
  };
};

export { useFileType };
