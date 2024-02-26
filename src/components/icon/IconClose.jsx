/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as Icon } from 'assets/icon-close.svg';


/**
 * @description IconClose
 * @returns {JSX.Element}
 */
const IconClose = () => {
  return <Icon css={cssClose} />;
};

export { IconClose };

const cssClose = css`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--grey-30);
    path {
      fill: var(--blue-bright);
    }
  }
`;
