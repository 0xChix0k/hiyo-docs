/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Flex, Form } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconPen } from 'assets/icon-pen.svg';
import { CusAvatar, CusButton, CusModal } from 'components';
import users from 'data/dropdown/users.json';
import { useCommon, useFormCommon } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { FlowContent } from './FlowContent';

const FormsetS2Content = React.forwardRef(({ data, setData }, ref) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (ref) {
      ref.current = form; // 將表單實例暴露給父組件
    }
  }, [form, ref]);
  const [openFlow, setOpenFlow] = useState(false);
  const [tempFlow, setTempFlow] = useState([]);
  const flowRef = useRef(null);

  useEffect(() => {
    openFlow && setTempFlow(data?.Flows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFlow]);

  const { getNameById } = useCommon();
  const { onValidate } = useFormCommon();

  const onClose = () => {
    setTempFlow([]);
    setOpenFlow(false);
  };

  const handleOk = async () => {
    const isForm0Valid = await onValidate(flowRef, null);
    if (isForm0Valid) {
      form.setFieldsValue({ Flows: tempFlow });
      setData({ ...data, Flows: tempFlow });
      onClose();
    }
  };

  return (
    <Flex vertical gap={16} flex="1 1 auto" css={cssFormSetContent}>
      <CusModal
        open={openFlow}
        title={{ text: data?.Flows ? '編輯流程' : '新增流程' }}
        isClose={true}
        onOk={()=>handleOk()}
        okStr="儲存"
        onCancel={onClose}
        h={650}
        content={
          <FlowContent
            formInstance={flowRef}
            flow={tempFlow}
            setFlow={setTempFlow}
          />
        }
      />
      <Flex flex="0 0 auto" className="top-btn">
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="Flows"
            rules={[
              {
                required: true,
                message: '請先設定流程才能繼續',
              },
            ]}
            style={{ marginBottom: 0 }}
            initialValue={data?.Flows}
          >
            <CusButton
              text={!!data?.Flows.length ? '編輯' : '新增'}
              icon={!!data?.Flows.length ? <IconPen /> : <IconAdd />}
              onClick={() => setOpenFlow(true)}
              bgColor={'#F1F6FF'}
            />
          </Form.Item>
        </Form>
      </Flex>
      {!!data?.Flows.length && (
        <FlowBlock list={data?.Flows} getName={getNameById} />
      )}
    </Flex>
  );
});
export { FormsetS2Content };

const cssFormSetContent = css`
  margin-top: 16px;
  overflow-y: hidden;
  .flow-div {
    overflow-y: auto;
    .num-box {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--grey-50);
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
  }
`;

const FlowBlock = ({ list, getName }) => {
  const boxSize = 20;
  return (
    <Flex vertical flex="1 0 250px" className="flow-div">
      {list
        ?.sort((a, b) => a?.Order - b?.Order)
        .map((item, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <Flex
                  key={index}
                  justify="center"
                  align="center"
                  flex="0 0 auto"
                  style={{ width: boxSize, height: 24 }}
                >
                  <Divider
                    type="vertical"
                    style={{ margin: 0, height: '100%' }}
                  />
                </Flex>
              )}
              <Flex
                key={item?.Id}
                align="center"
                gap={10}
                flex="0 0 auto"
                style={{ height: 40 }}
              >
                <Flex justify="center" align="center" className="num-box">
                  {index + 1}
                </Flex>
                <CusAvatar wh={boxSize} />
                <Flex vertical justify="center">
                  {getName(item?.Id, users, 'Id', 'Dep')}{' '}
                  {getName(item?.Id, users, 'Id', 'Name')}
                </Flex>
              </Flex>
            </React.Fragment>
          );
        })}
    </Flex>
  );
};
