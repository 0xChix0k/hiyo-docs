const useSetting = () => {
  const iniFormData = {
    Id: '',
    FormId: '',
    FormName: '',
    StartDate: '',
    FinalDate: '',
    TypeId: 'policy',
    UpTime: 2,
    IsUpdateUser: false,
    UpdateUser: [],
    IsAllRead: false,
    IsDownload: false,
    IsPrint: false,
    Flows: [],
  };

  return { iniFormData };
};

export { useSetting };
