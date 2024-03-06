import { css } from '@emotion/react';

export const cssResult = css`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  .result-container {
    width: 840px;
    > .title {
      width: 100%;
      font-size: 35px;
      font-weight: 600;
      color: var(--grey-default);
    }
    > .result-div {
      padding: 30px;
      background-color: white;
      border-radius: 25px;
      min-height: 400px;
      .nodata{
        color: var(--grey-60);
        height: 100%;
        > .comment {
          font-size: 18px;
          font-weight: 600;
          margin-top: 16px;
          margin-bottom: 8px;
        }
      }
      .list-item {
        padding: 10px;
        :hover {
          background-color: var(--grey-10);
        }
        .status {
          font-size: 13px;
          font-weight: 600;
          color: var(--blue-default);
        }
        .comment {
          font-size: 16px;
          font-weight: 600;
          color: var(--grey-default);
        }
        .version {
          font-size: 13px;
          color: var(--grey-default);
        }
        .date {
          font-size: 13px;
          color: var(--grey-50);
        }
      }
    }
  }
`;
