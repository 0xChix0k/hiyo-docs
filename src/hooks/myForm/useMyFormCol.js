/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { CusAvatar } from 'components';
import { useCommon } from 'hooks';

/**
 * @description MyForm List Column
 * @param {string} status
 * @returns {Array} columns
 */
const useMyFormCol = (status) => {
  const { EMPRTY_COLUMN } = useCommon();

  const approver = [
    { ...EMPRTY_COLUMN },
    {
      title: '目前簽核者',
      dataIndex: 'Approver',
      key: 'Approver',
      width: 283,
      ellipsis: {
        showTitle: false,
      },
      render: (Approver, record) => {
        return (
          <Flex align="center" gap={14} css={cssApprover}>
            <CusAvatar />
            <div>
              {record.Dep} {Approver}
            </div>
          </Flex>
        );
      },
    },
  ];

  return [
    {
      title: '名稱',
      dataIndex: 'Name',
      key: 'Name',
      width: 530,
      ellipsis: true,
      render: (Name, record) => {
        return (
          <Flex vertical justify="center" css={cssComment}>
            <div className="title">{Name}</div>
            <div className="date">{record.PostDate}</div>
          </Flex>
        );
      },
      // sorter: (a, b) => a.Comment - b.Comment,
      // sortIcon: (e) => <SorterIcon event={e} />,
      //fixed: 'left',
    },
    ...(status === 'approved' ? approver : []),
  ];
};

export { useMyFormCol };

const cssComment = css`
  > .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--grey-default);
  }
  > .date {
    font-size: 13px;
    color: var(--grey-50);
  }
`;
const cssApprover = css`
  color: var(--grey-default);
`;
