/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { cx } from '@emotion/css';
import { css } from '@emotion/react';
import { Collapse, ConfigProvider, Flex } from 'antd';
import { ReactComponent as IcoArrowDown } from 'assets/icon-arrow_down.svg';
import { ReactComponent as IcoAMark } from 'assets/icon-mark.svg';
import { ReactComponent as IconPen } from 'assets/icon-pen.svg';
import { ReactComponent as IconTrash } from 'assets/icon-trash.svg';
import { CusTooltip } from 'components';
import { memo } from 'react';

const CusCollpaseF = memo(
  ({
    itemsData,
    activeId,
    setId,
    isExtra = true,
    setFolderId,
    setName,
    setExtraAction,
  }) => {
    return (
      <div>
        {renderCollapse(
          itemsData,
          setId,
          activeId,
          isExtra,
          setFolderId,
          setName,
          setExtraAction
        )}
      </div>
    );
  }
);
export { CusCollpaseF };

const renderCollapseItems = (
  data,
  setId,
  activeId,
  isExtra,
  setFolderId,
  setName,
  setExtraAction,
  keys
) => {
  // 若 data 不存在或為空數組，返回空數組
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((item) => {
    const headerClass = cx(
      // Use cx for joining classes
      `${item.Id}-header`,
      activeId === item.Id && 'active-header' // Add 'active-header' conditionally
    );
    keys.push(item.Id);
    return {
      key: item.Id,
      headerClass: headerClass, // 应用唯一类名
      label: (
        <Flex
          align="center"
          gap={5}
          onClick={() => {
            setId(item.Id);
            setName(item.Name);
          }}
        >
          <IcoAMark />
          {item.Name}
        </Flex>
      ),
      extra: isExtra ? (
        <div
          className={`header-extra ${activeId === item.Id && 'active-extra'}`}
        >
          <GenExtra
            formId={item.Id}
            fName={item.Name}
            setFolderId={setFolderId}
            setAction={setExtraAction}
          />
        </div>
      ) : null,
      children: (
        <div>
          {renderCollapse(
            item.Children,
            setId,
            activeId,
            isExtra,
            setFolderId,
            setName,
            setExtraAction
          )}
        </div>
      ), // 遞迴處理子節點
    };
  });
};

const renderCollapse = (
  data,
  setId,
  activeId,
  isExtra,
  setFolderId,
  setName,
  setExtraAction,
  keys = []
) => {
  const items = renderCollapseItems(
    data,
    setId,
    activeId,
    isExtra,
    setFolderId,
    setName,
    setExtraAction,
    keys
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: 'var(--grey-default)',
        },
        components: {
          Collapse: {
            // headerBg: 'white',
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
        css={cssCollapse}
      />
    </ConfigProvider>
  );
};

const isForm = false;
const GenExtra = ({ formId, fName, setFolderId, setAction }) => {
  return (
    <Flex align="center" gap={8}>
      <div css={cssIcon(false)}>
        <IconPen
          onClick={(event) => {
            event.stopPropagation();
            setAction({
              fName: fName,
              action: 'rename',
            });
            setFolderId(formId);
          }}
        />
      </div>
      <div css={cssIcon(!isForm)}>
        {!isForm ? (
          <CusTooltip title="類別中已有表單，無法刪除" placement="bottom">
            <IconTrash
            // onClick={(event) => {
            //   event.stopPropagation();
            // }}
            />
          </CusTooltip>
        ) : (
          <IconTrash
            onClick={(event) => {
              event.stopPropagation();
              setAction({
                fName: fName,
                action: 'delete',
              });
              setFolderId(formId);
            }}
          />
        )}
      </div>
    </Flex>
  );
};

const cssCollapse = () => css`
  .ant-collapse-header {
    height: 40px;
    :is(.active-header) {
      background: var(--primary-light) !important;
      font-weight: 600;
      color: var(--primary-default);
    }
    cursor: pointer !important;
    .header-extra {
      display: none; /* Hide by default */
    }
    :hover {
      background: var(--grey-10) !important;
      .header-extra {
        display: block; /* Show on hover */
      }
    }
    .ant-collapse-expand-icon {
      padding-inline-end: 0px !important;
    }
  }
  .ant-collapse-content-box {
    padding: 0px 0px 0px 20px !important;
  }
`;

const cssIcon = (disabled) => css`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  :hover {
    background-color: var(--grey-30);
  }
  svg {
    width: 20px;
    height: 20px;
    path {
      fill: ${disabled ? 'var(--grey-40)' : 'var(--grey-50)'};
    }
  }
`;
