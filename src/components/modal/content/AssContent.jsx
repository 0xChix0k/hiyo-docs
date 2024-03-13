/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Flex, Form } from 'antd';
import { CusSelect } from 'components';
import { IconClose } from 'components/icon';
import assList from 'data/dropdown/associates.json';
import { useCommon, useFormCommon } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const AssContent = ({ formInstance, ass, setAss }) => {
  const [form] = Form.useForm();
  console.log('ass', ass);

  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);

  const { requiredObj } = useFormCommon();
  const { getNameById } = useCommon();
  const { types } = useSelector(selectDropdown);
  const boxSize = '20px';

  const [genAss, setGenAss] = useState(
    ass.map((item) => ({
      Id: item,
      Type: getNameById(item, assList, 'Id', 'Type'),
    }))
  );

  useEffect(() => {
    if (genAss && form) {
      form.setFieldsValue({ assData: genAss });
      setAss(genAss.map((item) => item.Id));
    }
  }, [genAss, form, setAss]);

  const onGetNewData = () => {
    const newData = form.getFieldValue('assData');
    setGenAss(newData);
  };
  const onAdd = () => {
    const initData = form.getFieldValue('assData');
    initData[initData.length - 1] = { Id: null, Order: initData.length };
    console.log('initData', initData);
    setGenAss(initData);
  };

  return (
    <Flex vertical gap={16} css={cssFlowContent(boxSize, ass.length)}>
      <Flex flex="0 0 17px" className="des">
        您可以搜尋文件編號或文件名稱
      </Flex>
      <Flex flex="1 0 calc(100% - 50px)" className="form-div">
        <Form form={form} autoComplete="off" style={{ width: '100%' }}>
          <Form.List name="assData" initialValue={genAss} rules={[requiredObj]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => {
                  // 获取当前行的Type值
                  const currentType = form.getFieldValue([
                    'assData',
                    index,
                    'Type',
                  ]);
                  // 根据Type值过滤assList
                  const filteredOptions = assList.filter(
                    (item) => item.Type === currentType
                  );
                  return (
                    <Flex gap={10} className="item-div" key={key}>
                      <NumBox text={index + 1} boxSize={boxSize} />
                      <Flex flex="1 1 auto" gap={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'Type']}
                          style={{ width: 150 }}
                          rules={[requiredObj]}
                        >
                          <CusSelect
                            // value={name}
                            onChange={(v) =>
                              setGenAss(form.getFieldValue('assData'))
                            }
                            options={types}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'Id']}
                          style={{ width: 300 }}
                          rules={[requiredObj]}
                        >
                          <CusSelect
                            onChange={(v) =>
                              setGenAss(form.getFieldValue('assData'))
                            }
                            options={filteredOptions}
                          />
                        </Form.Item>
                      </Flex>
                      <Flex flex="0 0 auto" className="close-btn">
                        <IconClose
                          wh={25}
                          onClick={() => {
                            remove(name);
                            onGetNewData();
                          }}
                        />
                      </Flex>
                    </Flex>
                  );
                })}
                <Form.Item>
                  <Flex
                    align="end"
                    className="add-btn"
                    gap={10}
                    onClick={() => {
                      add();
                      onAdd();
                    }}
                  >
                    <Flex
                      justify="center"
                      align="center"
                      flex={`0 0 ${boxSize}`}
                      className="num-box nomar"
                    >
                      +
                    </Flex>
                    <p className="btn-str">新增更多關聯</p>
                  </Flex>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Flex>
    </Flex>
  );
};

export { AssContent };

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
      border-radius: 54px;
      background: var(--grey-50);
      color: white;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
      :is(.nomar){
        margin-top: 0;
      }
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
