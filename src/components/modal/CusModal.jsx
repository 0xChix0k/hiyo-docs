/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Flex, Modal } from 'antd';
import { CusButton } from 'components';
import { IconClose } from 'components/icon';

/**
 * @description Custom Modal
 * @param {boolean} open=false
 * @param {object} title={} { text: '', icon: IconForm,sStr: '', sColor: ''}
 * @param {number} titleSize=18
 * @param {boolean} isClose=false
 * @param {boolean} isFooter=true
 * @param {function} onOk=null
 * @param {string} okType='default'
 * @param {string} okStr='確定'
 * @param {function} onCancel=null
 * @param {string} cancelType='text'
 * @param {string} cancelStr=''
 * @param {function} exFn=null
 * @param {string} exType='default'
 * @param {string} exStr='退件'
 * @param {number} w=450
 * @param {number} h=240
 * @param {array} placement=[]
 * @param {string} padding='30px 30px'
 * @param {ReactNode} content=null
 * @returns  {JSX.Element}
 */
const CusModal = ({
  open = false,
  title = {},
  titleSize = 18,
  isClose = false,
  isFooter = true,
  onOk = null,
  okType = 'default',
  okStr = '確定',
  onCancel = null,
  cancelType = 'text',
  cancelStr = '',
  exFn = null,
  exType = 'default',
  exBgColor = '#EF4564',
  exStr = '退件',
  w = 450,
  h = 240,
  placement = [],
  padding = '30px 30px',
  content = null,
}) => {
  const placeStyles = !!placement.length
    ? { top: placement[0], left: placement[1],margin: 0}
    : {};

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
            <CusHeader
              title={title}
              titleSize={titleSize}
              isClose={isClose}
              closeFn={onCancel}
            />
          ) : null
        }
        style={placeStyles}
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
                exFn && (
                  <CusButton
                    key="exFn"
                    text={exStr}
                    onClick={exFn}
                    type={exType}
                    bgColor={exBgColor}
                    radius={37}
                  />
                ),
                onOk && (
                  <CusButton
                    key="submit"
                    text={okStr}
                    onClick={onOk}
                    bgColor="#07CE6F"
                    type={okType}
                    radius={37}
                  />
                ),
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
const CusHeader = ({ title, titleSize, isClose, closeFn }) => {
  return (
    <Flex align="center" css={cssHeader(titleSize, title?.sColor)}>
      <Flex align="center" gap={8} className="left">
        {title?.icon && title?.icon}
        {title?.text && <div className="text">{title?.text}</div>}
        {title?.sStr && <div className="status">{title?.sStr}</div>}
      </Flex>
      {isClose && (
        <Flex align="center" style={{ position: 'absolute', right: 0 }}>
          <IconClose wh={30} onClick={closeFn} />
        </Flex>
      )}
    </Flex>
  );
};

const cssHeader = (titleSize, sColor) => css`
  position: relative;
  .left {
    .text {
      font-size: ${titleSize}px;
      color: var(--grey-default);
      font-weight: 600;
    }
    .status {
      font-size: 14px;
      font-weight: 600;
      color: ${sColor || 'var(--grey-default)'};
    }
  }
`;

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
      margin-bottom: 24px;
    }
    .ant-modal-body {
      width: 100%;
      flex: 1 1 auto;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
    }
    .ant-modal-footer {
      flex: 0 0 40px;
      margin-top: 24px;
      display: flex;
      justify-content: end;
      gap: 8px;
    }
  }
`;
