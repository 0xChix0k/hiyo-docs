/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconWord } from 'assets/files/icon_doc_fills.svg';
import { ReactComponent as IconEmpty } from 'assets/icon-empty-box.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { CapsuleTabs } from 'components';
import { useState } from 'react';
import { cssResult } from './resultCss';

const Result = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Flex vertical align="center" css={cssResult}>
      <Flex vertical gap={30} className="result-container">
        <p className="title">「ISMS-P-003」的搜尋結果</p>
        <Flex vertical gap={24} className="result-div">
          <Flex flex="0 0 auto">
            <CapsuleTabs
              tabs={['文件', '申請單', '表單']}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Flex>
          <Flex vertical flex='1 1 auto'>
            <Flex vertical justify="center" align="center" className="nodata">
              <IconEmpty />
              <p className="comment">沒有顯示任何內容</p>
              <p>建議嘗試不同的關鍵字、檢查拼字或調整過濾工具。</p>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Result;

const ResultItem = (activeTab) => {
  const itemDIv =
    activeTab === 0 ? (
      <Flex gap={10} className="ist-item">
        <Flex style={{ width: 40, height: 40 }} justify="center" align="center">
          <IconWord />
        </Flex>
        <Flex vertical gap={4}>
          <div className="comment">123.docx</div>
          <Flex gap={10} align="center">
            <p className="version">1.0</p>
            <p className="date">2024-01-05</p>
          </Flex>
        </Flex>
      </Flex>
    ) : activeTab === 1 ? (
      <Flex vertical>
        <p className="status">簽核中</p>
        <p className="comment">
          General recommendations documents naming convention
        </p>
        <p className="date">2024-01-05</p>
      </Flex>
    ) : activeTab === 2 ? (
      <Flex gap={10} className="ist-item">
        <Flex style={{ width: 40, height: 40 }} justify="center" align="center">
          <IconForm />
        </Flex>
        <Flex vertical gap={4}>
          <div className="comment">ISMS-P-003 資訊資產管理</div>
          <Flex gap={10} align="center">
            <p className="date">2024-01-05</p>
          </Flex>
        </Flex>
      </Flex>
    ) : null;

  return itemDIv;
};
