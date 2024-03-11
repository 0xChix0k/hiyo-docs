/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Flex, Form } from 'antd';
import { CusUserM,CusUser } from 'components';
import { useFormCommon } from 'hooks';
import { useEffect, useState } from 'react';

const SetContent = ({ formInstance, data = [] }) => {
  const [tabId, setTabId] = useState('tab-1');
  const [formData, setFormData] = useState({
    managers: [21],
    conveners: [],
    secretarys: [],
    securitys: [],
  });
  const { requiredObj } = useFormCommon();
  const [form] = Form.useForm();
  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: 13,
            labelColor: 'var(--grey-60)',
          },
        },
      }}
    >
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
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ width: '100%' }}
            >
              <Flex vertical style={{ marginBottom: 16 }}>
                <div className="extrTitle">文件管理員</div>
                <div className="extrDes">此角色擁有表單增修維護的權限</div>
              </Flex>
              <Form.Item
                name="managers"
                rules={[requiredObj]}
                initialValue={formData?.managers}
              >
                <CusUserM
                  value={formData?.managers}
                  onChange={(v) => setFormData({ ...formData, managers: v })}
                  placeholder="選擇人員 ( 可複選 )"
                />
              </Form.Item>
              <Flex vertical style={{ marginBottom: 16 }}>
                <div className="extrTitle">文件管理員</div>
                <div className="extrDes">
                  以下角色可應用在各表單簽核流程中並扮演簽核人員
                </div>
              </Flex>
              <Form.Item
                name="conveners"
                label="召集人"
                rules={[requiredObj]}
                initialValue={formData?.conveners}
              >
                <CusUserM
                  value={data?.conveners}
                  onChange={(v) => setFormData({ ...formData, conveners: v })}
                  placeholder="選擇人員 ( 可複選 )"
                />
              </Form.Item>
              <Form.Item
                name="secretarys"
                label="執行秘書"
                rules={[requiredObj]}
                initialValue={formData?.secretarys}
              >
                <CusUserM
                  value={data?.secretarys}
                  onChange={(v) => setFormData({ ...formData, secretarys: v })}
                  placeholder="選擇人員 ( 可複選 )"
                />
              </Form.Item>
              <Form.Item
                name="securitys"
                label="資安小組成員"
                rules={[requiredObj]}
                initialValue={formData?.securitys}
              >
                <CusUserM
                  value={data?.securitys}
                  onChange={(v) => setFormData({ ...formData, securitys: v })}
                  placeholder="選擇人員 ( 可複選 )"
                />
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
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
