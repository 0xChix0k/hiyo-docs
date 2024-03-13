/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Form } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconAssociate } from 'assets/icon-associate.svg';
import { ReactComponent as IconPen } from 'assets/icon-pen.svg';
import { CusButton, CusModal } from 'components';
import assList from 'data/dropdown/associates.json';

import { useCommon, useFormCommon } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { AssContent } from './AssContent';

const FormsetS3Content = React.forwardRef(({ data, setData }, ref) => {
  const hasAssociated = true;
  const [form] = Form.useForm();
  useEffect(() => {
    if (ref) {
      ref.current = form; // 將表單實例暴露給父組件
    }
  }, [form, ref]);
  const [openAss, setOpenAss] = useState(false);
  const [associate, setAssociate] = useState([]);
  const assFlowRef = useRef(null);

  useEffect(() => {
    openAss && setAssociate(data?.Associates || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAss]);

  const { getNameById } = useCommon();
  const { onValidate } = useFormCommon();

  const onClose = () => {
    setAssociate([]);
    setOpenAss(false);
  };

  const handleOk = async () => {
    const isForm0Valid = await onValidate(assFlowRef, null);
    if (isForm0Valid) {
      setData({ ...data, Associates: associate });
      onClose();
    }
  };

  console.log('FormsetS3Content, data:', data);

  return (
    <Flex
      vertical
      justify={hasAssociated ? 'start' : 'center'}
      align={hasAssociated ? 'start' : 'center'}
      gap={16}
      flex="1 0 auto"
      css={cssFormSetContent}
    >
      <CusModal
        open={openAss}
        title={{ text: data?.Flows ? '編輯關聯' : '新增關聯' }}
        isClose={true}
        onOk={() => handleOk()}
        okStr="儲存"
        onCancel={onClose}
        w={600}
        h={650}
        content={
          <AssContent
            formInstance={assFlowRef}
            ass={associate}
            setAss={setAssociate}
          />
        }
      />
      {hasAssociated ? (
        <>
          <Flex flex="0 0 auto" className="top-btn">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ width: '100%' }}
            >
              <Form.Item
                name="Associates"
                style={{ marginBottom: 0 }}
                initialValue={data?.Associates || []}
              >
                <CusButton
                  text={data?.Associates ? '編輯' : '新增'}
                  icon={data?.Associates ? <IconPen /> : <IconAdd />}
                  onClick={() => setOpenAss(true)}
                  bgColor={'#F1F6FF'}
                />
              </Form.Item>
            </Form>
          </Flex>
          {data?.Associates && (
            <AssBlock list={data?.Associates} getName={getNameById} />
          )}
        </>
      ) : (
        <>
          <IconAssociate className="nodata-icon" />
          <div className="nodata">沒有可以關聯的表單</div>
        </>
      )}
    </Flex>
  );
});
export { FormsetS3Content };

const cssFormSetContent = css`
  margin-top: 16px;
  overflow-y: hidden;
  .ass-div {
    width: 100%;
    overflow-y: auto;
    padding-bottom: 8px;
    ul {
      list-style-type: disc; /* 使用圆形黑点作为列表项标记 */
      margin-left: 20px; /* 添加一些左边距，以便黑点可见 */
      li {
        color: var(--grey-default);
      }
    }
    .ass-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--grey-50);
    }
  }
  .nodata {
    color: var(--grey-50);
  }
  .nodata-icon {
    path {
      fill: #b1b7e6;
    }
  }
`;

const AssBlock = ({ list, getName }) => {
  return (
    <Flex vertical gap={12} flex="0 0 350px" className="ass-div">
      <Flex align="center" flex="0 0 auto" className="ass-title">
        關聯({list?.length})
      </Flex>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{getName(item, assList, 'Id', 'Name')}</li>;
        })}
      </ul>
    </Flex>
  );
};
