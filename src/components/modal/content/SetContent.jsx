/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useFormCommon } from 'hooks';
import {CusSelect} from 'components';

const SetContent = ({ formInstance, data = [] }) => {
  const [tabId, setTabId] = useState('tab-1');
  const [formData, setFormData] = useState({
    managers:[],
    conveners:[],
    secretarys:[],
    securitys:[],
  });
  const options = [];
  const { requiredObj } = useFormCommon();
  const [form] = Form.useForm();
  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);

  return (
    <Flex gap={24} css={cssSetting}>
      <Flex vertical flex="0 0 184px" className="setting-left">
        <BtnTab
          tabClass={'tab-1'}
          tabId={tabId}
          setTabId={setTabId}
          text={'權限'}
        />
      </Flex>
      <Flex vertical gap={22} flex="1 1 auto" className="setting-right">
        <Flex align="center" flex="0 0 auto" className="title-div">
          權限
        </Flex>
        <Flex flex="1 1 auto" className="form-div">
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item
              name="manager"
              label={
                <Flex vertical>
                  <div className="extrTitle">文件管理員</div>
                  <div className="extrDes">此角色擁有表單增修維護的權限</div>
                </Flex>
              }
              rules={[requiredObj]}
              initialValue={formData?.managers}
            >
              <CusSelect
                value={data?.FormId}
                options={options}
                onChange={(v) => console.log(v)}
                placeholder="選擇表單 *"
              />
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};
export { SetContent };

const BtnTab = ({ tabClass, tabId, setTabId, text }) => {
  return (
    <Flex
      align="center"
      className={tabClass}
      css={cssTab(tabId)}
      onClick={() => setTabId(tabId)}
    >
      {text}
    </Flex>
  );
};

const cssTab = (itabId) => css`
  height: 45px;
  border-radius: 15px;
  padding: 14px 16px;
  cursor: pointer;
  :is(.${itabId}) {
    background: var(--primary-light);
    color: var(--primary-default);
    font-weight: 600;
  }
`;

const cssSetting = css`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  > .setting-left {
    height: 100%;
    overflow-y: auto;
  }
  > .setting-right {
    height: 100%;
    overflow-y: hidden;
    > .title-div {
      font-size: 18px;
      font-weight: 600;
      color: var(--grey-default);
    }
    > .form-div {
      overflow-y: auto;
      .extrTitle {
        font-size: 15px;
        font-weight: 600;
        color: var(--grey-default);
      }
      .extrDes {
        font-size: 14px;
        color: var(--grey-60);
      }
    }
  }
`;
