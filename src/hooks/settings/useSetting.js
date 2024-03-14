import dayjs from 'dayjs';

const useSetting = () => {
  const iniFormData = {
    Id: null,
    FolderId: null,
    FormId: null,
    FormName: '',
    StartDate: dayjs().format('YYYY-MM-DD'),
    FinalDate: null,
    TypeId: 'policy',
    UpTime: 2,
    IsUpdateUser: false,
    UpdateUser: [],
    IsAllRead: false,
    IsDownload: false,
    IsPrint: false,
    Flows: [],
    Associates: [],
  };

  return { iniFormData };
};

export { useSetting };
