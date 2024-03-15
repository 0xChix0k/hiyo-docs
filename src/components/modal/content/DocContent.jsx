/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { ReactComponent as IconDownload } from 'assets/icon-download.svg';
import { CapsuleTabs, CusAvatar, CusButton, CusModal } from 'components';
import { useState } from 'react';
import { genConfig } from 'react-nice-avatar';
import { useGetReaders } from 'services/readerService';
import { ReadersContent } from './ReadersContent';

const DocContent = ({ isMa, docData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [linkId, setLinkId] = useState(null);
  const tabs = ['基本資料', '版本歷程'];
  const infoFields = [
    { label: '目前版本', value: docData?.License },
    { label: '最新發佈日期', value: docData?.PostDate },
    {
      label: '擁有者',
      value: `${docData?.Owner?.Dep} ${docData?.Owner?.Name}`,
      avatar: genConfig(),
    },
    {
      label: '觀看數',
      value: `${docData?.RealReadCunt} / ${docData?.ReadCount}`,
      link: isMa ? true : false,
      onClick: () => (isMa ? setLinkId(docData?.Id) : null),
    },
  ];
  const {
    data: readersData,
    isSuccess,
    isLoading,
    isError,
  } = useGetReaders(linkId);

  return (
    <Flex vertical gap={24} css={cssDocContent}>
      <CusModal
        open={!!linkId && isSuccess}
        title={{ text: '觀看數', icon: null }}
        isClose={true}
        isFooter={false}
        onCancel={() => setLinkId(null)}
        h={650}
        content={<ReadersContent readersList={readersData} />}
      />
      <Flex vertical className="title-div">
        <Flex className="title">{docData?.Name}</Flex>
        <Flex className="category">{docData?.Path}</Flex>
        <CusButton text={'下載'} icon={<IconDownload />} bgColor={'#F1F6FF'} />
      </Flex>
      <CapsuleTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <Flex vertical gap={24} className="info-div">
        {activeTab === 1
          ? docData?.LicenseHistorys.map((item, index) => (
              <Flex key={index} vertical gap={4} className="info">
                <div className="label h-label">V {item?.History_License}</div>
                <div className="value h-value">{item?.License_Date}</div>
              </Flex>
            ))
          : infoFields?.map((item, index) => (
              <Flex key={index} vertical gap={4} className="info">
                <div className="label">{item.label}</div>
                <Flex align="center" gap={4}>
                  {item.avatar && <CusAvatar wh={25} />}
                  <div
                    className={`${item.link && 'link'} value`}
                    onClick={item.onClick || null}
                  >
                    {item.value}
                  </div>
                </Flex>
              </Flex>
            ))}
      </Flex>
    </Flex>
  );
};
export { DocContent };

export const cssDocContent = css`
  height: 100%;
  .title-div {
    flex: 0 0 auto;
    .title {
      font-size: 20px;
      font-weight: 600;
      color: var(--grey-default);
      margin-bottom: 10px;
    }
    .category {
      color: var(--grey-60);
      margin-bottom: 16px;
    }
  }
  .info-div {
    flex: 1 1 auto;
    overflow-y: auto;
    .info {
      > .label {
        font-size: 13px;
        font-weight: 600;
        color: var(--grey-60);
        :is(.h-label) {
          color: var(--grey-default);
        }
      }
      .value {
        color: var(--grey-default);
        :is(.link) {
          color: var(--blue-default);
          text-decoration: underline;
          cursor: pointer;
        }
        :is(.h-value) {
          font-size: 13px;
          color: var(--grey-50);
        }
      }
    }
  }
`;
