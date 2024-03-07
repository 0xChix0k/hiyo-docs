import dayjs from 'dayjs';
import { useCommon } from 'hooks';

const useDateOption = (cusName) => {
  const { dFormat } = useCommon();

  const searchDates = [
    {
      Id: 'all',
      Name: '任何日期',
      DValue: [],
    },
    {
      Id: 'b1m',
      Name: '過去 1 個月',
      DValue: [dFormat(dayjs().add(-1, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'b6m',
      Name: '過去 6 個月',
      DValue: [dFormat(dayjs().add(-6, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'b1y',
      Name: '過去 1 年',
      DValue: [dFormat(dayjs().add(-1, 'y')), dFormat(dayjs())],
    },
    {
      Id: 'b2y',
      Name: '過去 2 年',
      DValue: [dFormat(dayjs().add(-2, 'y')), dFormat(dayjs())],
    },
    {
      Id: 'custom',
      Name: cusName,
      DValue: [],
    },
  ];

  const myFormDates = [
    {
      Id: 'b1m',
      Name: '過去 1 個月',
      DValue: [dFormat(dayjs().add(-1, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'b3m',
      Name: '過去 3 個月',
      DValue: [dFormat(dayjs().add(-3, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'b6m',
      Name: '過去 6 個月',
      DValue: [dFormat(dayjs().add(-6, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'b12m',
      Name: '過去 12 個月',
      DValue: [dFormat(dayjs().add(-12, 'M')), dFormat(dayjs())],
    },
    {
      Id: 'custom',
      Name: cusName,
      DValue: [],
    },
  ];

  return { searchDates, myFormDates };
};

export { useDateOption };
