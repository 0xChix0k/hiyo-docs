/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Form } from 'antd';
import { TextInput } from 'components';
import {
  FormsetS1Content,
  FormsetS2Content,
  FormsetS3Content,
} from 'components/modal/content';
import { useFormCommon } from 'hooks';
import { useEffect } from 'react';

const FormSetContent = ({ level, data, setData, refs }) => {
  console.log('data', data);
  const { requiredObj } = useFormCommon();
  const [form] = Form.useForm();
  useEffect(() => {
    if (!!refs.length) {
      refs[0].current = form; // 將表單實例暴露給父組件
    }
  }, [form, refs]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const tabClass = (tabNo) => {
    return level === tabNo ? 'tab active' : 'tab';
  };

  const associated = false;
  const subFormTitiles =
    level === 1
      ? ['基本設定', '']
      : level === 2
      ? ['簽核流程', '你可以設定這份表單的申請簽核流程']
      : [
          '關聯表單',
          '您可以選擇與此表單關聯的表單。 當該表單發生變化時，關聯的表單也必須同時更新。',
        ];

  return (
    <Flex vertical css={cssFormSetContent}>
      <Flex vertical gap={24} flex="0 0 auto" className="setting-top">
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="FormId"
            rules={[requiredObj]}
            initialValue={data?.FormId}
          >
            <TextInput
              value={data?.FormId}
              onChange={(v) => setData({ ...data, FormId: v })}
              placeholder="表單編號 *"
            />
          </Form.Item>
          <Form.Item
            name="FormName"
            rules={[requiredObj]}
            initialValue={data?.FormName}
          >
            <TextInput
              value={data?.FormName}
              onChange={(v) => setData({ ...data, FormName: v })}
              placeholder="表單名稱 *"
            />
          </Form.Item>
        </Form>
      </Flex>
      <Flex gap={24} flex="1 1 auto" className="setting-bottom">
        <Flex vertical flex="0 0 160px" className="bottom-left">
          <Flex align="center" className={tabClass(1)}>
            基本設定
          </Flex>
          <Flex align="center" className={tabClass(2)}>
            簽核流程
          </Flex>
          <Flex align="center" className={tabClass(3)}>
            關聯表單
          </Flex>
        </Flex>
        <Flex vertical flex="1 1 auto" className="bottom-right">
          <Flex vertical gap={8} flex="0 0 auto" className="title-div">
            <div className="title">{subFormTitiles[0]}</div>
            {(level === 2 || (level === 3 && associated)) && (
              <div className="des">{subFormTitiles[1]}</div>
            )}
          </Flex>
          {level === 1 ? (
            <FormsetS1Content ref={refs[1]} data={data} setData={setData} />
          ) : level === 2 ? (
            <FormsetS2Content ref={refs[2]} data={data} setData={setData} />
          ) : level === 3 ? (
            <FormsetS3Content ref={refs[3]} data={data} setData={setData} />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { FormSetContent };

const cssFormSetContent = css`
  width: 100%;
  height: 100%;
  /* padding-top: 30px; */
  overflow-y: hidden;
  .setting-top {
  }
  .setting-bottom {
    overflow-y: hidden;
    .bottom-left {
      height: 100%;
      overflow-y: auto;
      .tab {
        padding: 14px 16px;
        border-radius: 15px;
        color: var(--grey-40);
        :is(.active) {
          background: var(--primary-light);
          color: var(--primary-default);
          font-weight: 600;
        }
      }
    }
    .bottom-right {
      height: 100%;
      overflow-y: hidden;
      > .title-div {
        > .title {
          font-size: 18px;
          font-weight: 600;
          color: var(--grey-default);
        }
        > .des {
          color: #8f9bc8;
        }
      }
    }
  }
`;
