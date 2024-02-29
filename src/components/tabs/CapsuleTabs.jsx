/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

/**
 * @description Capsule Tabs
 * @param {string[]} tabs
 * @param {number} activeTab
 * @param {function} onChange
 * @returns {JSX.Element}
 */
const CapsuleTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div style={{ padding: 1 }}>
      <div size={2} css={cssTabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => onChange(index)}
            className={`tab ${index === activeTab ? 'active' : ''}`}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export { CapsuleTabs };

const cssTabs = css`
  display: inline-flex;
  align-items: center;
  background: var(--grey-10);
  border-radius: 36px;
  overflow: visible;
  position: relative;
  height: 40px;
  .tab {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 11px 19px;
    border: var(--grey-10);
    background: none;
    cursor: pointer;
    border: none;
    /* transition: background 0.2s ease; */
    border-radius: 36px;
    font-weight: 600;
    color: var(--grey-40);
    :is(.active) {
      color: var(--grey-default);
      border: 1px solid var(--grey-20);
      background: white;
      box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
    }
  }
`;
