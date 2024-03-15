import { css } from '@emotion/react';

export const cssSetting = css`
  width: 100%;
  height: 100%;
  > .setting-left {
    overflow-y: hidden;
    background-color: white;
    border-right: 1px solid #dee1f4;
    > .tool-div {
      padding: 20px 10px 10px 20px;
      > .title {
        font-size: 20px;
        font-weight: 600;
        color: var(--grey-default);
      }
    }
    > .list-div {
      padding-bottom: 16px;
      overflow-y: auto;
    }
    > .noList-div {
      margin-top: 200px;
    }
  }
  > .setting-right {
    width: 100%;
    padding: 40px 40px 16px 40px;
    > .title-div {
      width: 100%;
      > .title {
        font-size: 25px;
        font-weight: 600;
        color: var(--grey-default);
      }
    }
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
