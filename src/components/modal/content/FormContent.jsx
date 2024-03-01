/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Form } from 'antd';
import { ReactComponent as IconCheck2 } from 'assets/icon-check_2.svg';
import { ReactComponent as IconUpload } from 'assets/icon-upload.svg';
import { CusButton, CusSelect, TextInput, UploadInput } from 'components';
import { useFormCommon } from 'hooks';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const FormContent = ({ data, setData }) => {
  const { types, forms } = useSelector(selectDropdown);
  const fileInput = useRef(null);
  const testList = [];
  const isList = !!testList.length;
  const { requiredObj, reqiuredFileObj } = useFormCommon();
  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <Flex gap={24} css={cssFormContent(isList)}>
      <Flex vertical gap={24} flex={'1 1 auto'} className="left">
        <UploadInput
          ref={fileInput}
          onChange={(e) => console.log('file', e.target.files[0])}
        />
        <Form layout="vertical" autoComplete="off">
          <Form.Item
            name="type"
            rules={[requiredObj]}
            style={{
              display: 'inline-block',
              width: '142px',
            }}
          >
            <CusSelect
              value={data?.typeId}
              options={types}
              onChange={(v) => handleChange('typeId', v)}
              placeholder="類型 *"
            />
          </Form.Item>
          <Form.Item
            name="form"
            rules={[requiredObj]}
            style={{
              display: 'inline-block',
              width: 'calc(100% - (142px + 24px))',
              marginLeft: '24px',
            }}
          >
            <CusSelect
              value={data?.formId}
              options={forms}
              onChange={(v) => handleChange('formId', v)}
              placeholder="選擇表單 *"
            />
          </Form.Item>
          <Form.Item name="title" rules={[requiredObj]}>
            <TextInput
              value={data?.title}
              onChange={(v) => handleChange('title', v)}
              placeholder="標題 *"
            />
          </Form.Item>
          <Form.Item name="des">
            <TextInput
              value={data?.des}
              onChange={(v) => handleChange('des', v)}
              placeholder="描述"
              isArea={true}
            />
          </Form.Item>
          <Form.Item name="file" rules={[reqiuredFileObj]}>
            <CusButton
              text={'附件'}
              icon={<IconUpload />}
              onClick={() => fileInput.current.click()}
              bgColor={'#EFF0F8'}
              htmlType="button"
            />
          </Form.Item>
        </Form>
      </Flex>
      <Flex vertical gap={16} flex={'0 0 250px'} className="right">
        <Flex align="center" flex={'0 0 auto'} className="title">
          簽核流程
        </Flex>
        <Flex
          vertical
          align="center"
          gap={isList ? 0 : 14}
          flex={'1 1 auto'}
          className="list"
        >
          {!isList && (
            <>
              <IconCheck2 />
              <div className="des">選擇表單後，您可以預覽審核流程。</div>
            </>
          )}
          {isList &&
            testList.map((item, index) => {
              return <Flex key={index} align="center" gap={8}></Flex>;
            })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export { FormContent };

const cssFormContent = (isList) => css`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  .left {
    height: 100%;
    overflow-y: auto;
  }
  .right {
    height: 100%;
    overflow-y: hidden;
    .title {
      font-size: 13px;
      font-weight: 600;
      color: var(--grey-50);
    }
    .list {
      height: 100%;
      overflow-y: auto;
      padding: ${isList ? '0px' : '80px 13px 0px 13px'};
      .des {
        color: var(--grey-50);
      }
    }
  }
`;
