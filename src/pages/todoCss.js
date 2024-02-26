import { css } from '@emotion/react';

export const cssTodo = css`
  width: 100%;
  height: 100%;
  padding-block: 30px;
  > .todo-container {
    width: 700px;
    > .title {
      width: 100%;
      font-size: 35px;
      font-weight: 600;
      color: var(--grey-default);
      margin-bottom: 30px;
    }
    > .nodata {
      height: 400px;
      border-radius: 25px;
      background: white;
      .text{
        color: var(--grey-50);
      }
    }
  }
`;
