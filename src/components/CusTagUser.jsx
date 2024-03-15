/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Tag } from 'antd';

/**
 * @description CusTagUser
 * @param {string} text
 * @param { JSX.Element } avatar
 * @param {function} onMouseDown
 * @param {boolean} closable
 * @param {function} onClose
 * @returns  {JSX.Element}
 */
const CusTagUser = ({ text, avatar, onMouseDown, closable, onClose }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSizeSM: 14,
        },
        components: {
          Tag: {
            defaultBg: 'var(--grey-20)',
            defaultColor: 'var(--grey-default)',
          },
        },
      }}
    >
      <Tag
        onMouseDown={onMouseDown}
        closeIcon={closable}
        onClose={onClose}
        icon={avatar}
        css={cssTag}
      >
        {text}
      </Tag>
    </ConfigProvider>
  );
};
export { CusTagUser };

const cssTag = css`
  display: flex;
  align-items: center;
  padding: 4px !important;
  border-radius: 32px;
  margin: 0px 4px 4px 0px;
  > span {
    margin-left: 10px;
  }
`;
