/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { FileBox } from 'components';
import { useCommon } from 'hooks';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const ViewContent = ({ data }) => {
  const { types, forms } = useSelector(selectDropdown);
  const { getNameById } = useCommon();

  return (
    <Flex vertical gap={24} css={cssViewContent}>
      <Flex vertical gap={10} flex="0 0 auto" className="title-div">
        <Flex className="path">
          {getNameById(data?.TypeId, types)} /{' '}
          {getNameById(data?.FormId, forms)}
        </Flex>
        <Flex wrap={'wrap'} className="comment">
          {data?.Comment}
        </Flex>
        <Flex className="date">{data?.PostDate}</Flex>
      </Flex>
      <Flex vertical gap={8} flex="0 0 auto">
        {data?.Files.map((item, index) => (
          <FileBox key={index} file={item} />
        ))}
      </Flex>
      <Flex vertical gap={8} flex="1 1 auto" className="des-div">
        <Flex flex="0 0 auto" className="des-label">
          描述
        </Flex>
        <Flex flex="1 1 auto">{data?.Des}</Flex>
      </Flex>
    </Flex>
  );
};

export { ViewContent };

const cssViewContent = css`
  height: 100%;
  .title-div {
    .path {
      color: var(--grey-60);
    }
    .comment {
      font-size: 20px;
      font-weight: 600;
      color: var(--grey-default);
    }
    .date {
      font-size: 13px;
      color: var(--grey-50);
    }
  }
  .des-div {
    .des-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--grey-50);
    }
  }
`;
