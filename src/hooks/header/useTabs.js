/**
 * @description tab info
 * @param {boolean} isMa
 * @returns  {Object} tabs
 */
const useTabs = (isMa) => {
  const initTabs = [
    {
      key: 'todo',
      label: '待辦',
    },
    {
      key: 'my-form',
      label: '我的表單',
    },
    {
      key: 'document',
      label: '文件庫',
    },
    {
      key: 'setting',
      label: '表單設定',
    },
  ];

  const tabs = isMa
    ? initTabs
    : initTabs.filter((tab) => tab.key !== 'setting');

  return { tabs };
};
export { useTabs };
