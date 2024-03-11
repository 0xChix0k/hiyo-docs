/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, Tooltip } from 'antd';

/**
 * @description CusTooltip
 * @param {any} children
 * @param {string} title="NA"
 * @param {string} placement='top'
 * @param {string} bgColor='var(--grey-default)'
 * @param {boolean} arrow=false
 * @returns {JSX.Element}
 */
const CusTooltip = ({
  children,
  title = 'NA',
  placement = 'top',
  bgColor = 'var(--grey-default)',
  arrow = true,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 10,
          controlHeight: 35,
          lineHeight: 1.5,
          colorText: 'white',
          paddingXS: '9px 10px',
        },
      }}
    >
      <Tooltip
        // open={true}
        title={title}
        placement={placement}
        color={bgColor}
        arrow={arrow}
        mouseLeaveDelay={0}
        css={cssTooltip}
      >
        {children}
      </Tooltip>
    </ConfigProvider>
  );
};
export { CusTooltip };

const cssTooltip = css`
  font-weight: 500;
`;
