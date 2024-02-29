/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Flex, Modal } from 'antd';
import { CusButton } from 'components';
import { IconClose } from 'components/icon';

/**
 * @description Custom Modal
 * @param {boolean} open=false
 * @param {object} title={} { text: '', icon: IconForm }
 * @param {boolean} isClose=false
 * @param {boolean} isFooter=true
 * @param {function} onOk=null
 * @param {string} okType='default'
 * @param {string} okStr='確定'
 * @param {function} onCancel=null
 * @param {string} cancelType='text'
 * @param {string} cancelStr=''
 * @param {number} w=450
 * @param {number} h=240
 * @param {string} padding='30px 30px'
 * @param {ReactNode} content=null
 * @returns  {JSX.Element}
 */
const CusModal = ({
  open = false,
  title = {},
  isClose = false,
  isFooter = true,
  onOk = null,
  okType = 'default',
  okStr = '確定',
  onCancel = null,
  cancelType = 'text',
  cancelStr = '',
  w = 450,
  h = 240,
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
        title={
          !!Object.keys(title)?.length || isClose ? (
            <CusHeader title={title} isClose={isClose} closeFn={onCancel} />
          ) : null
        }
        onOk={onOk}
        onCancel={onCancel}
        closeIcon={false}
        css={cssModal(padding, h)}
        destroyOnClose
        maskClosable={false}
        width={w}
        footer={
          isFooter
            ? [
                cancelStr && (
                  <CusButton
                    key="back"
                    text={cancelStr}
                    onClick={onCancel}
                    type={cancelType}
                    radius={37}
                  />
                ),
                <CusButton
                  key="submit"
                  text={okStr}
                  onClick={onOk}
                  bgColor="#07CE6F"
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

/**
 * @description Custom Header
 * @param {object} title
 * @param {boolean} isClose
 * @param {function} closeFn
 * @returns {JSX.Element}
 */
const CusHeader = ({ title, isClose, closeFn }) => {
  return (
    <Flex align="center" style={{ position: 'relative' }}>
      <Flex align="center" gap={8}>
        {title?.icon && <title.icon />}
        {title?.text && <div>{title.text}</div>}
      </Flex>
      {isClose && (
        <Flex align="center" style={{ position: 'absolute', right: 0 }}>
          <IconClose wh={30} onClick={closeFn} />
        </Flex>
      )}
    </Flex>
  );
};

/**
 * @description cssModal
 * @param {string} padding
 * @param {number} h
 * @returns
 */
const cssModal = (padding, h) => css`
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    padding: ${padding};
    border-radius: 25px;
    height: ${h}px;
    .ant-modal-header {
      flex: 0 0 30px;
      margin-bottom: 0;
    }
    .ant-modal-body {
      flex: 1 1 72px;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
    }
    .ant-modal-footer {
      flex: 0 0 40px;
      margin-top: 0;
      display: flex;
      justify-content: end;
    }
  }
`;
