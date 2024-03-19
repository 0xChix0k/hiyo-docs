/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Collapse, ConfigProvider } from 'antd';
import { ReactComponent as IconArrow } from 'assets/icon-arrow_up.svg';

/**
 * @description CusCollapse
 * @param {string[]} activeKey=[]
 * @param {Array} items=[]
 * @param {Function} onChange
 * @param {boolean} bordered=false
 * @param {boolean} isHover=true
 * @returns {JSX.Element}
 */
const CusCollapse = ({
  activeKey = [],
  items = [],
  onChange,
  bordered = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: 'white',
            contentBg: 'white',
            headerPadding: '25px 25px 25px 25px',
            contentPadding: '10px 50px 10px 50px',
          },
        },
        token: {
          borderRadiusLG: 25,
        },
      }}
    >
      <Collapse
        activeKey={activeKey}
        items={items}
        collapsible="header"
        onChange={onChange}
        bordered={bordered}
        expandIcon={(panelProps) => <IconArrow />}
        expandIconPosition="end"
        css={cssCollapse(activeKey)}
      />
    </ConfigProvider>
  );
};
export { CusCollapse };

const cssCollapse = (key) => css`
  .ant-collapse-header {
    font-size: 18px;
    font-weight: 600;
    .ant-collapse-expand-icon svg {
      transform: ${key && !!key.length ? 'rotate(0deg)' : 'rotate(180deg)'};
    }
  }
  .ant-collapse-content-box > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    padding: 10px 16px !important;
    border-radius: 15px;
    :hover {
      background-color: var(--grey-10);
    }
  }
`;
