import { css } from '@emotion/react';

export const cssSelect = css`
  width: 100%;
  .ant-select-selector {
    background: var(--grey-20) !important;
  }
  :is(.ant-select-status-error, .ant-select-focused, ) {
    .ant-select-selector {
      background: white !important;
      border-width: 1.5px !important;
    }
  }
  :not(.ant-select-focused) {
    .ant-select-selector {
      :hover {
        border: 1px solid black !important;
      }
    }
  }
  :is(.ant-select-focused) {
    .ant-select-selector {
      border: 1px solid var(--blue-bright);
    }
  }
`;