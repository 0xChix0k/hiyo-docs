/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { CusDivider } from 'components';
import { cssDocContent } from './DocContent';

const UpdateContent = ({ data }) => {
  const infoFields = [
    { label: '發佈起始日', value: data?.PostDate },
    { label: '更新頻率', value: '兩個月' },
  ];

  return (
    <Flex vertical gap={24} css={cssDocContent}>
      <Flex vertical className="title-div">
        <Flex className="title">{data?.Name}</Flex>
        <Flex className="category">{data?.Path}</Flex>
      </Flex>
      <CusDivider />
      <Flex vertical gap={24} className="info-div">
        {infoFields?.map((item, index) => (
          <Flex key={index} vertical gap={4} className="info">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
export { UpdateContent };
