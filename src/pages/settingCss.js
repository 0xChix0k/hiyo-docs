import { css } from '@emotion/react';

export const cssSetting = css`
  width: 100%;
  height: 100%;
  > .setting-left {
    background-color: white;
    > .tool-div {
      padding: 20px 10px 10px 20px;
      > .title {
        font-size: 20px;
        font-weight: 600;
        color: var(--grey-default);
      }
    }
    > .list-div {
    }
    > .noList-div {
      margin-top: 200px;
    }
  }
  > .setting-right {
  }
  .des {
    color: var(--grey-50);
  }
  .btn-icon {
    path {
      fill: var(--blue-default);
    }
  }
`;