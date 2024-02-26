const TodoList = () => {
  const bookList = [
    {
      Id: 1,
      Comment: 'ISMS-P-007 資通安全稽核管理程序書',
      Path: '20 程序書 | 管理程序書',
      PostDate: '2021-09-28',
      dep: '資訊部',
      Owner: '林小安',
      readCount: 30,
      realReadCunt: 27,
      License: '1.0',
      LicenseHistorys: [
        {
          History_License: '1.0',
          License_Date: '2021-09-28',
        },
      ],
    },
    {
      Id: 2,
      Comment: 'ISMS-P-007 資通安全稽核管理程序書',
      Path: '21 程序書 | 管理程序書',
      PostDate: '2021-09-29',
      dep: '資訊部',
      Owner: '林大安',
      readCount: 30,
      realReadCunt: 27,
      License: '1.0',
      LicenseHistorys: [
        {
          History_License: '1.0',
          License_Date: '2021-09-28',
        },
      ],
    },
  ];

  return { bookList };
};

export default TodoList;
