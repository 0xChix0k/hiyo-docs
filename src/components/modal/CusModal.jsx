/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Modal } from 'antd';
import { CusButton } from 'components';

const CusModal = ({
  open = false,
  title = 'NA',
  closeIcon = false,
  isFooter = true,
  onOk = null,
  okType = 'primary',
  okStr = '確定',
  onCancel = null,
  cancelType = 'text',
  cancelStr = '取消',
  w = 450,
  padding = '30px 30px',
  content = null,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            titleFontSize: 20,
            titleColor: '#2D336B',
          },
        },
      }}
    >
      <Modal
        open={open}
        title={title}
        onOk={onOk}
        onCancel={onCancel}
        closeIcon={closeIcon}
        css={cssModal(padding)}
        destroyOnClose
        maskClosable={false}
        width={w}
        footer={
          isFooter
            ? [
                <CusButton
                  key="back"
                  text={cancelStr}
                  onClick={onCancel}
                  type={cancelType}
                  radius={37}
                />,
                <CusButton
                  key="submit"
                  text={okStr}
                  onClick={onOk}
                  bgColor="#07ce6f"
                  tColor="white"
                  type={okType}
                  radius={37}
                />,
              ]
            : null
        }
      >
        {content}
      </Modal>
    </ConfigProvider>
  );
};

export { CusModal };

const cssModal = (padding) => css`
  .ant-modal-content {
    padding: ${padding || '30px 30px'};
    border-radius: 25px;
  }
`;
