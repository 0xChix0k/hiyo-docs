/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { ReactComponent as IconMail } from 'assets/icon-mail.svg';
import { CusAvatar, CusButton } from 'components';

const ReadersContent = ({ readersList }) => {
  const readeds = readersList?.Readers?.filter(
    (item) => item?.IsReaded !== false
  );
  const unReads = readersList?.Readers?.filter(
    (item) => item?.IsReaded === false
  );

  return (
    <Flex vertical css={cssReadersContent}>
      {!!unReads?.length && (
        <>
          <Flex justify="space-between" align="center" className="item-title">
            <div>未讀({unReads?.length})</div>
            <CusButton
              text={'發送通知信'}
              icon={<IconMail />}
              bgColor={'#F1F6FF'}
            />
          </Flex>
          {unReads?.map((item) => {
            return <ReaderItem key={item?.Id} item={item} />;
          })}
        </>
      )}
      {!!readeds?.length && (
        <>
          <Flex justify="space-between" align="center" className="item-title">
            <div>已讀({readeds?.length})</div>
          </Flex>
          {readeds?.map((item) => {
            return <ReaderItem key={item?.Id} item={item} />;
          })}
        </>
      )}
    </Flex>
  );
};

export { ReadersContent };

const ReaderItem = ({ item }) => {
  return (
    <Flex gap={10} align="center" className="item">
      <CusAvatar />
      <div>
        {item?.Dep} {item?.Name}
      </div>
    </Flex>
  );
};

const cssReadersContent = css`
  height: 100%;
  overflow-y: auto;
  margin-block: 30px;
  .item-title {
    min-height: 40px;
    color: var(--grey-60);
  }
  .item {
    min-height: 40px;
    color: var(--grey-default);
  }
`;
