import { Flex } from 'antd';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';

const useSetFormsCol = () => {
  return [
    {
      title: '名稱',
      dataIndex: 'FormName',
      key: 'FormName',
      // width: 530,
      ellipsis: true,
      render: (FormName, record) => {
        return (
          <Flex align="center" gap={8}>
            <IconForm />
            <div>{FormName}</div>
          </Flex>
        );
      },
      // sorter: (a, b) => a.Comment - b.Comment,
      // sortIcon: (e) => <SorterIcon event={e} />,
      //fixed: 'left',
    },
    {
      title: '最後修改日期',
      dataIndex: 'FinalDate',
      key: 'FinalDate',
      // width: 530,
      ellipsis: true,
      // sorter: (a, b) => a.Comment - b.Comment,
      // sortIcon: (e) => <SorterIcon event={e} />,
      //fixed: 'left',
    },
  ];
};

export { useSetFormsCol };
