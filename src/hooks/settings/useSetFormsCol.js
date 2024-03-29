import Icon from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
/**
 * @description Set Forms Column
 * @returns {Array<object>} columns
 */
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
            <Icon
              component={IconForm}
              style={{
                fontSize: 25,
              }}
            />
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
