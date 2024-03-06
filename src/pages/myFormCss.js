
import { css } from '@emotion/react';

export const cssMyForm = css`
  width: 100%;
  height: 100%;
  padding-block: 30px;
  > .my-form-container {
    width: 930px;
    > .title {
      width: 100%;
      font-size: 35px;
      font-weight: 600;
      color: var(--grey-default);
    }
    > .form-div{
      padding: 30px;
      border-radius: 25px;
      background-color: white;
      min-height: 400px;
    }
    > .nodata {
      height: 400px;
      border-radius: 25px;
      background: white;
      .text {
        color: var(--grey-50);
      }
    }
  }
`;
