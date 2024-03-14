/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { ReactComponent as IconArrowDown } from 'assets/icon-arrow_down.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { ReactComponent as IconAMark } from 'assets/icon-mark.svg';
import { useState } from 'react';

const CusFolder = ({ list, active, setActive }) => {
  console.log('CusFolder, active:', active);
  return (
    <>
      {list?.map((data, index) => {
        return (
          <Folder
            key={data?.Id}
            itemData={data}
            act={active}
            setAct={setActive}
          >
            {data.Forms.map((form, index) => {
              return (
                <FormItem
                  key={form?.Id}
                  form={form}
                  act={active}
                  setAct={setActive}
                />
              );
            })}
            {data?.Children?.map((child, index) => (
              <RecursiveFolder
                key={child.Id}
                data={child}
                act={active}
                setAct={setActive}
              />
            ))}
          </Folder>
        );
      })}
    </>
  );
};

export { CusFolder };

const FormItem = ({ form, act, setAct }) => {
  return (
    <Flex
      align="center"
      key={form.Id}
      className={act.Id === form.Id ? 'folder-item active' : 'folder-item'}
      onClick={() => setAct({ Id: form.Id, Name: form.FormName, type: 'form' })}
    >
      <Flex flex="0 0 auto">
        <Icon
          component={IconArrowDown}
          style={{
            fontSize: 20,
          }}
        />
      </Flex>
      <Flex align="center" flex="1 1 auto" gap={5}>
        <Icon
          component={IconForm}
          style={{
            fontSize: 20,
          }}
        />
        {form.FormName}
      </Flex>
    </Flex>
  );
};

const RecursiveFolder = ({ data, act, setAct }) => (
  <Folder itemData={data} act={act} setAct={setAct}>
    {data.Forms.map((form, index) => {
      return <FormItem key={form?.Id} form={form} act={act} setAct={setAct} />;
    })}
    {data.Children.map((child, index) => (
      <RecursiveFolder key={child.Id} data={child} act={act} setAct={setAct} />
    ))}
  </Folder>
);

const Folder = ({ itemData, act, setAct, level, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Flex vertical css={cssFolder}>
      <Flex
        align="center"
        onClick={() =>
          setAct({ Id: itemData.Id, Name: itemData.Name, type: 'folder' })
        }
        className={`folder-item ${act.Id === itemData.Id ? 'active' : ''}`}
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
      </Flex>
      <div
        className={`folder-children ${isOpen ? 'open' : ''}`}
        style={{ paddingLeft: 20 }}
      >
        {children}
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
    :hover {
      :not(.active) {
        background-color: #f7f8fe;
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
