import { ConfigProvider, Dropdown } from 'antd';
import { cloneElement } from 'react';


/**
 * @description Custom Dropdown
 * @param {Array} items=[]
 * @param {Function} onClick=null
 * @param {JSX.Element} btn=null
 * @param {number} dw=150 
 * @returns 
 */
const CusDropdown = ({ items = [], onClick = null, btn = null, dw = 150 }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgHover: 'var(--grey-10)',
          colorText: 'var(--grey-default)',
        },
        components: {
          Dropdown: { paddingBlock: 10 },
        },
      }}
    >
      <Dropdown
        menu={{ items: items, onClick: onClick }}
        arrow={false}
        trigger={['click']}
        overlayStyle={{ minWidth: dw, paddingBlock: 10 }}
        dropdownRender={(menu) => {
          return cloneElement(menu, {
            style: { padding: '10px 0px' },
          });
        }}
      >
        <div onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
          {btn}
        </div>
      </Dropdown>
    </ConfigProvider>
  );
};

export { CusDropdown };
