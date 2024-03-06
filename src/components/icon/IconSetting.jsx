/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as Icon } from 'assets/icon-settings.svg';

/**
 * @description IconSetting
 * @param {Function} onClick
 * @param {boolean} isClick
 * @returns {JSX.Element}
 */
const IconSetting = ({ onClick = null, isClick = false }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };
  return <Icon css={cssSetting(isClick)} onClick={handleClick} />;
};

export { IconSetting };

const cssSetting = (isClick) => css`
  cursor: pointer;
  border-radius: 50%;
  background-color: ${isClick ? 'var(--blue-light)' : 'transparent'};
  &:hover {
    background-color: ${isClick ? 'var(--blue-light)' : 'var(--grey-30)'};
    path {
      fill: var(--blue-bright);
    }
  }
`;
