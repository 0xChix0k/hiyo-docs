/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import { Collapse, ConfigProvider, Flex } from 'antd';
import { ReactComponent as IcoArrowDown } from 'assets/icon-arrow_down.svg';
import { ReactComponent as IcoAMark } from 'assets/icon-mark.svg';

const CusCollpaseF = ({ itemsData, activeId, setId }) => {
  return <div>{renderCollapse(itemsData, setId, activeId)}</div>;
};
export { CusCollpaseF };

const renderCollapseItems = (data, setId, activeId, dynamicStyles, keys) => {
  // 若 data 不存在或為空數組，返回空數組
  if (!data || data.length === 0) {
    return [];
  }

  return data.map((item) => {
    const dynamicStyle = css`
      .${item.Id}-header {
        background: ${activeId === item.Id ? 'var(--primary-light)' : 'white'};
        color: ${activeId === item.Id
          ? 'var(--primary-default)'
          : 'var(--grey-default)'};
      }
    `;
    dynamicStyles.push(dynamicStyle);
    keys.push(item.Id);
    return {
      key: item.Id,
      headerClass: `${item.Id}-header`, // 应用唯一类名
      label: (
        <Flex
          align="center"
          gap={5}
          onClick={() => setId(item.Id)}
          style={{
            background: activeId === item.Id ? 'var(--primary-light)' : 'white',
            fontWeight: activeId === item.Id ? 600 : 400,
            color:
              activeId === item.Id
                ? 'var(--primary-default)'
                : 'var(--grey-default)',
          }}
        >
          <IcoAMark />
          {item.Name}
        </Flex>
      ),
      children: <div>{renderCollapse(item.Children, setId, activeId)}</div>, // 遞迴處理子節點
    };
  });
};

const renderCollapse = (data, setId, activeId, keys = []) => {
  const dynamicStyles = [];
  const items = renderCollapseItems(data, setId, activeId,dynamicStyles, keys);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: 'var(--grey-default)',
        },
        components: {
          Collapse: {
            headerBg: 'white',
            headerPadding: '10px 5px',
            // contentPadding: '10px 32px',
          },
        },
      }}
    >
      <Collapse
        defaultActiveKey={keys}
        items={items.map((item) => ({
          ...item,
          headerClass: item.headerClass, // 应用动态生成的样式
        }))}
        bordered={false}
        ghost={true}
        collapsible="icon"
        expandIcon={({ isActive }) => (
          <Icon
            component={IcoArrowDown}
            rotate={isActive ? 0 : -90}
            style={{
              fontSize: 20,
            }}
          />
        )}
        css={[cssCollapse, ...dynamicStyles]}
      />
    </ConfigProvider>
  );
};

const cssCollapse = css`
  .ant-collapse-header {
    cursor: pointer !important;
    :hover {
      background: var(--grey-10) !important;
    }
    .ant-collapse-expand-icon {
      padding-inline-end: 0px !important;
    }
  }
  .ant-collapse-content-box {
    padding: 0px 0px 0px 20px !important;
  }
`;
