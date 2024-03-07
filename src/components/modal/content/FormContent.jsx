/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Flex, Form } from 'antd';
import { ReactComponent as IconCheck2 } from 'assets/icon-check_2.svg';
import { ReactComponent as IconCheck } from 'assets/icon-check_round.svg';
import { ReactComponent as IconCheckGrey } from 'assets/icon-check_round_grey.svg';
import { ReactComponent as IconUpload } from 'assets/icon-upload.svg';
import {
  CusAvatar,
  CusButton,
  CusSelect,
  FileBox,
  TextInput,
  UploadInput,
} from 'components';
import { useAddFiles, useFormCommon } from 'hooks';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetReaders } from 'services/readerService';
import { selectDropdown } from 'store/dropdownSlice';
import { ViewContent } from '.';

const FormContent = ({ formInstance, data, setData = null }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);
  console.log('data', data);
  const {
    data: readersData,
    isLoading,
    isSuccess,
  } = useGetReaders(data?.Id === 7 ? 7 : null);
  const isList = !!readersData?.Readers?.length && isSuccess;
  const { types, forms } = useSelector(selectDropdown);
  const fileInput = useRef(null);
  const { onAddFile } = useAddFiles();
  const isOnlyView = data?.Status === 'pending' || data?.Status === 'approved';
  const isRejected = data?.Status === 'rejected';
  const { requiredObj, fileRules } = useFormCommon();
  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };
  const handleAddFiles = (files) => {
    const updatedFiles = [...data.Files, ...files];
    setData({ ...data, Files: updatedFiles });
    form.setFieldsValue({ files: updatedFiles });
  };

  return (
    <Flex vertical css={cssFormContent(isRejected, isList)}>
      {isRejected && <RejInfo data={data?.RejectInfo} />}
      <Flex gap={24} className="flex-div" flex="1 1 auto">
        <Flex vertical gap={24} flex={'1 1 auto'} className="left">
          {isOnlyView ? (
            <ViewContent data={data} />
          ) : (
            <>
              <UploadInput
                ref={fileInput}
                onChange={(e) => onAddFile(e, data.Files, handleAddFiles)}
              />
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                  name="TypeId"
                  rules={[requiredObj]}
                  style={{
                    display: 'inline-block',
                    width: '142px',
                  }}
                  initialValue={data?.TypeId}
                >
                  <CusSelect
                    value={data?.TypeId}
                    options={types}
                    onChange={(v) => handleChange('TypeId', v)}
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
                  initialValue={data?.FormId}
                >
                  <CusSelect
                    value={data?.FormId}
                    options={forms}
                    onChange={(v) => handleChange('FormId', v)}
                    placeholder="選擇表單 *"
                  />
                </Form.Item>
                <Form.Item
                  name="title"
                  rules={[requiredObj]}
                  initialValue={data?.Comment}
                >
                  <TextInput
                    value={data?.Comment}
                    onChange={(v) => handleChange('Comment', v)}
                    placeholder="標題 *"
                  />
                </Form.Item>
                <Form.Item name="des" initialValue={data?.Des}>
                  <TextInput
                    value={data?.Des}
                    onChange={(v) => handleChange('Des', v)}
                    placeholder="描述"
                    isArea={true}
                  />
                </Form.Item>
                <Form.Item
                  name="files"
                  rules={fileRules}
                  initialValue={data?.Files}
                >
                  <Flex vertical gap={16}>
                    <CusButton
                      text={'附件'}
                      icon={<IconUpload />}
                      onClick={() => fileInput.current.click()}
                      bgColor={'#EFF0F8'}
                      htmlType="button"
                    />
                    {data?.Files.map((item, index) => (
                      <FileBox key={index} file={item} />
                    ))}
                  </Flex>
                </Form.Item>
              </Form>
            </>
          )}
        </Flex>
        <Flex vertical gap={16} flex={'0 0 250px'} className="right">
          <Flex align="center" flex={'0 0 auto'} className="title">
            簽核流程
          </Flex>
          <Flex vertical flex="1 1 auto" className="list">
            {!isList ? (
              <Flex vertical gap={14} align="center">
                <IconCheck2 />
                <div className="des">選擇表單後，您可以預覽審核流程。</div>
              </Flex>
            ) : (
              <FlowBlock list={readersData?.Readers} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { FormContent };

/**
 * @description RejInfo
 * @param {object} data
 * @returns {JSX.Element}
 */
const RejInfo = ({ data }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      flex="0 0 70px"
      className="reject-div"
    >
      <Flex gap={16} align="center" flex="1 1 auto" className="rej-left">
        <CusAvatar wh={25} />
        <Flex vertical className="rej-info-div">
          <div className="user-info">
            {data?.Dep} {data?.Name}
          </div>
          <div>{data?.ReMark}</div>
        </Flex>
      </Flex>
      <Flex align="center" flex="0 0 auto" className="rej-right">
        {data?.RejDate}
      </Flex>
    </Flex>
  );
};

/**
 * @description FlowBlock
 * @param {Array<object>} list
 * @returns {JSX.Element}
 */
const FlowBlock = ({ list }) => {
  const boxSize = 25;
  return (
    <Flex vertical style={{paddingRight:8}}>
      {list?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <Flex key={index} align="center" gap={10} style={{ height: 24 }}>
                <Flex
                  justify="center"
                  style={{ width: boxSize, height: '100%' }}
                >
                  <Divider
                    type="vertical"
                    style={{ margin: 0, height: '100%' }}
                  />
                </Flex>
              </Flex>
            )}
            <Flex
              key={item?.Id}
              justify="space-between"
              align="center"
              style={{ height: 47 }}
            >
              <Flex align="center" flex="1 1 auto" gap={10}>
                <CusAvatar wh={boxSize} />
                <Flex vertical justify="center">
                  <p>
                    {item?.Dep} {item?.Name}
                  </p>
                  {!!item?.ApproveDate && (
                    <p style={{ fontSize: 13, color: 'var(--grey-50)' }}>
                      {item?.ApproveDate}
                    </p>
                  )}
                </Flex>
              </Flex>
              <Flex
                flex="0 0 auto"
                justify="center"
                align="center"
                styel={{ width: 25, height: 25 }}
              >
                {!!item?.ApproveDate ? <IconCheck /> : <IconCheckGrey />}
              </Flex>
            </Flex>
          </React.Fragment>
        );
      })}
    </Flex>
  );
};

/**
 * @description cssFormContent
 * @param {boolean} isRejected
 * @param {boolean} isList
 * @returns {css}
 */
const cssFormContent = (isRejected, isList) => css`
  width: 100%;
  height: 100%;
  margin-top: ${isRejected ? '0px' : '6px'};
  .reject-div {
    background: var(--red-light);
    margin-bottom: 30px;
    border-radius: 15px;
    padding-inline: 16px 24px;
    color: var(--red-dark);
    .rej-left {
      .rej-info-div {
        .user-info {
          font-weight: 600;
        }
      }
    }
    .rej-right {
      font-size: 13px;
    }
  }
  .flex-div {
    width: 100%;
    overflow-y: hidden;
    .left {
      height: 100%;
      overflow-y: auto;
    }
    .right {
      height: 100%;
      overflow-y: hidden;
      > .title {
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
  }
`;
