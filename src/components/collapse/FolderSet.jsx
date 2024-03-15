/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { ReactComponent as IconArrowDown } from 'assets/icon-arrow_down.svg';
import { ReactComponent as IconAMark } from 'assets/icon-mark.svg';
import { ReactComponent as IconPen } from 'assets/icon-pen.svg';
import { ReactComponent as IconTrash } from 'assets/icon-trash.svg';
import { CusTooltip } from 'components';
import { useState } from 'react';

const FolderSet = ({
  list,
  active,
  setActive,
  isExtra = true,
  setFolderId,
  setExtraAction,
}) => {
  return (
    <>
      {list?.map((data, index) => {
        return (
          <Folder
            key={data?.Id}
            itemData={data}
            act={active}
            setAct={setActive}
            isExtra={isExtra}
            setFolderId={setFolderId}
            setExtraAction={setExtraAction}
            level={0}
          >
            {data?.Children?.map((child, index) => (
              <RecursiveFolder
                key={child.Id}
                data={child}
                act={active}
                setAct={setActive}
                isExtra={isExtra}
                setFolderId={setFolderId}
                setExtraAction={setExtraAction}
                level={1}
              />
            ))}
          </Folder>
        );
      })}
    </>
  );
};

export { FolderSet };

const RecursiveFolder = ({
  data,
  act,
  setAct,
  isExtra,
  setFolderId,
  setExtraAction,
  level,
}) => (
  <Folder
    itemData={data}
    act={act}
    setAct={setAct}
    isExtra={isExtra}
    setFolderId={setFolderId}
    setExtraAction={setExtraAction}
    level={level}
  >
    {data.Children.map((child, index) => (
      <RecursiveFolder
        key={child.Id}
        data={child}
        act={act}
        setAct={setAct}
        isExtra={isExtra}
        setFolderId={setFolderId}
        setExtraAction={setExtraAction}
        level={level + 1}
      />
    ))}
  </Folder>
);

const Folder = ({
  itemData,
  act,
  setAct,
  level,
  isExtra,
  setFolderId,
  setExtraAction,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Flex vertical css={cssFolder}>
      <Flex
        align="center"
        onClick={() => setAct({ Id: itemData.Id, Name: itemData.Name })}
        className={`folder-item ${act.Id === itemData.Id ? 'active' : ''}`}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        <Flex flex="0 0 auto" onClick={toggle}>
          <Icon
            component={IconArrowDown}
            rotate={isOpen ? 0 : -90}
            style={{
              fontSize: 20,
            }}
          />
        </Flex>
        <Flex align="center" flex="1 1 auto" gap={5}>
          <IconAMark />
          {itemData.Name}
        </Flex>
        {isExtra && (
          <div
            className={`header-extra ${
              act.Id === itemData.Id && 'active-extra'
            }`}
          >
            <GenExtra
              formId={itemData.Id}
              fName={itemData.Name}
              setFolderId={setFolderId}
              setAction={setExtraAction}
              isForm={!!itemData?.Forms.length}
            />
          </div>
        )}
      </Flex>
      <div className={`folder-children ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </Flex>
  );
};

const GenExtra = ({ formId, fName, setFolderId, setAction, isForm }) => {
  return (
    <Flex align="center" gap={8}>
      <div css={cssIcon(false)}>
        <IconPen
          onClick={(event) => {
            event.stopPropagation();
            setAction({
              fName: fName,
              action: 'rename',
              place: [175, 50],
            });
            setFolderId(formId);
          }}
        />
      </div>
      <div css={cssIcon(isForm)}>
        {isForm ? (
          <CusTooltip title="類別中已有表單，無法刪除" placement="bottom">
            <IconTrash />
          </CusTooltip>
        ) : (
          <IconTrash
            onClick={(event) => {
              event.stopPropagation();
              setAction({
                fName: fName,
                action: 'delete',
                place: [],
              });
              setFolderId(formId);
            }}
          />
        )}
      </div>
    </Flex>
  );
};

const cssFolder = css`
  width: 100%;
  .folder-item {
    width: 100%;
    height: 40px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--grey-default);
    .header-extra {
      display: none; /* Hide by default */
    }
    :hover {
      :not(.active) {
        background: var(--grey-10) !important;
      }
      .header-extra {
        display: block; /* Show on hover */
      }
    }
    :is(.active) {
      background-color: var(--primary-light);
      font-weight: 600;
      color: var(--primary-dark);
    }
  }
  .folder-children {
    :is(.open) {
      max-height: 500px;
    }
    overflow: hidden;
    transition: max-height 0.3ms ease-in-out;
    max-height: 0;
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
