import { css } from '@emotion/react';

export const cssLogin = css`
  width: 100%;
  height: 100%;
  > .header {
    width: 100%;
    padding-inline: 30px;
  }
  > .content {
    overflow-y: auto;
    > .form {
      width: 400px;
      height: 523px;
      border-radius: 20px;
      padding: 50px;
      background-color: white;
      > .title {
        font-size: 30px;
        font-weight: 600;
        color: black;
      }
      > .sub-title {
        font-size: 30px;
        font-weight: 600;
        color: var(--grey-60);
        margin-bottom: 24px;
      }
    }
  }
  > .footer {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    color: var(--grey-70);
  }
`;
