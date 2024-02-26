/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * @description Custom Tabs
 * @param {string} tabKey
 * @param {Array} items
 * @returns
 */
const CusTabs = ({ tabKey, items = [] }) => {
  const navigate = useNavigate();
  const handleChange = (key) => {
    navigate(`/${key}`);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemPaddingLG: '19px 13px',
            horizontalMargin: '0 0 0 0',
            horizontalItemGutter: 0,
            itemColor: 'var(--grey-40)',
            itemActiveColor: 'var(--grey-default)',
            itemSelectedColor: 'var(--grey-default)',
            titleFontSizeLG: 14,
            inkBarColor: 'var(--grey-default)',
          },
        },
      }}
    >
      <Tabs
        css={cssTabs}
        size="large"
        activeKey={tabKey}
        items={items}
        onChange={handleChange}
      />
    </ConfigProvider>
  );
};
export { CusTabs };

const cssTabs = css`
  .ant-tabs-tab-btn {
    font-weight: 600;
  }
`;
