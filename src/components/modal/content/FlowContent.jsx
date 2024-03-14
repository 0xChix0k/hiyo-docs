/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Flex, Form } from 'antd';
import { CusUser } from 'components';
import { IconClose } from 'components/icon';
import { useFormCommon } from 'hooks';
import React, { useEffect } from 'react';

const FlowContent = ({ formInstance, flow, setFlow }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);
  const { requiredObj } = useFormCommon();
  const boxSize = '20px';

  useEffect(() => {
    !flow.length && setFlow([{ Id: null, Order: 1 }]);
    form && form.setFieldsValue({ flow });
  }, [flow, form, setFlow]);

  const onGetNewFlow = () => {
    const newFlow = form
      .getFieldValue('flow')
      .map((item, index) => ({ Id: item.Id, Order: index + 1 }));
    setFlow(newFlow);
  };
  const onGetTest = () => {
    const initFlow = form.getFieldValue('flow');
    initFlow[initFlow.length - 1] = { Id: null, Order: initFlow.length };
    console.log('initFlow', initFlow);
    setFlow(initFlow);
  };

  return (
    <Flex vertical gap={16} css={cssFlowContent(boxSize, flow.length)}>
      <Flex flex="0 0 17px" className="des">
        你可以設定該表單的審核人員
      </Flex>
      <Flex flex="1 0 calc(100% - 50px)" className="form-div">
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <Form.List name="flow" initialValue={flow} rules={[requiredObj]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <React.Fragment key={key}>
                      {index > 0 && <DividerBox />}
                      <Flex gap={10} className="item-div">
                        <NumBox text={index + 1} boxSize={boxSize} />
                        <Flex flex="1 1 auto">
                          <Form.Item
                            {...restField}
                            name={[name, 'Id']}
                            // noStyle={
                            //   form.getFieldError([name, 'Id']) > 0 ? false : true
                            // }
                            style={{ width: '100%' }}
                            rules={[requiredObj]}
                          >
                            <CusUser
                              value={name}
                              onChange={(v) =>
                                setFlow(form.getFieldValue('flow'))
                              }
                            />
                          </Form.Item>
                        </Flex>
                        <Flex flex="0 0 auto" className="close-btn">
                          <IconClose
                            wh={25}
                            onClick={() => {
                              remove(name);
                              onGetNewFlow();
                            }}
                          />
                        </Flex>
                      </Flex>
                    </React.Fragment>
                  );
                })}
                <Form.Item>
                  <>
                    <DividerBox />
                    <Flex
                      align="end"
                      className="add-btn"
                      gap={10}
                      onClick={() => {
                        add();
                        onGetTest();
                      }}
                    >
                      <NumBox text="+" boxSize={boxSize} />
                      <div className="btn-str">新增站點</div>
                    </Flex>
                  </>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Flex>
    </Flex>
  );
};

export { FlowContent };

const NumBox = ({ text, boxSize }) => {
  return (
    <Flex
      justify="center"
      // align="center"
      flex={`0 0 ${boxSize}`}
      className="num-box"
    >
      {text}
    </Flex>
  );
};

const DividerBox = () => {
  return (
    <Flex justify="center" align="center" className="divider-div">
      <Divider type="vertical" style={{ margin: 0, height: '100%' }} />
    </Flex>
  );
};

const cssFlowContent = (boxSize, flowConut) => css`
  height: 100%;
  > .des {
    color: var(--grey-60);
  }
  .form-div {
    overflow-y: auto;
    position: relative;
    .divider-div {
      position: relative;
      z-index: 500;
      width: ${boxSize};
      height: 16px;
      margin-top: -20px;
    }
    .item-div {
      padding-right: 15px;
      :hover {
        .close-btn {
          visibility: ${flowConut > 1 ? 'visible' : 'hidden'};
        }
      }
      .close-btn {
        visibility: hidden;
        margin-top: 5px;
      }
    }
    .num-box {
      position: relative;
      z-index: 100;
      height: ${boxSize};
      border-radius: 50%;
      background: var(--grey-50);
      color: white;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
    }
    .add-btn {
      cursor: pointer;
      .btn-str {
        font-weight: 600;
        color: var(--blue-default);
      }
    }
  }
`;
