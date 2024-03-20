import { css } from '@emotion/react';

export const cssMyForm = css`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  overflow-y: auto;
  > .my-form-container {
    width: 930px;
    margin-bottom: 24px;
    > .title {
      width: 100%;
      font-size: 35px;
      font-weight: 600;
      color: var(--grey-default);
    }
    > .form-div {
      padding: 30px;
      border-radius: 25px;
      background-color: white;
      min-height: 400px;
      > .tool-div {
      }
      > .list-div {
      }
      > .nodata {
        color: var(--grey-60);
        .icon {
          width: 45px;
          height: 45px;
          fill: var(--grey-60);
        }
      }
    }
  }
`;