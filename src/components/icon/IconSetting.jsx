/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as Icon } from 'assets/icon-settings.svg';
import { useState } from 'react';


/**
 * @description IconSetting
 * @param {Function} onClick 
 * @returns {JSX.Element}
 */
const IconSetting = ({ onClick = null }) => {
  const [isClick, setIsClick] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
    setIsClick(!isClick);
  };
  return <Icon css={cssSetting(isClick)} onClick={handleClick} />;
};

export { IconSetting };

const cssSetting = (isClick) => css`
  cursor: pointer;
  border-radius: 50%;
  background-color: ${isClick ? 'var(--grey-30)' : 'transparent'};
  &:hover {
    background-color: var(--grey-30);
    path {
      fill: var(--blue-bright);
    }
  }
`;
