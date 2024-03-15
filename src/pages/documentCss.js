import { css } from '@emotion/react';

export const cssDocument = css`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  > .left {
    height: 100%;
    background-color: white;
    border-right: 1px solid #dee1f4;
    overflow-y: hidden;
    .left-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--grey-default);
      padding: 20px 0px 10px 20px;
    }
    > .left-list {
      width: 100%;
      overflow-y: auto;
      > .no-forms {
        width: 246px;
        margin-top: 206px;
        > .btn {
          font-weight: 600;
          text-decoration-line: underline;
          color: var(--blue-default);
          cursor: pointer;
        }
      }
    }
  }
  > .right {
    height: 100%;
    padding: 40px 40px 0px 40px;
    overflow-y: hidden;
    .right-list {
      overflow-y: hidden;
      .no-forms {
        > .book-icon {
          width: 50px;
          height: 50px;
          svg {
            color: var(--grey-40);
          }
        }
        .no-form-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--grey-60);
        }
      }
    }
    > .right-title {
      font-size: 25px;
      font-weight: 600;
      color: #2d336b;
    }
  }
  .des {
    color: var(--grey-50);
    text-align: center;
  }
`;
