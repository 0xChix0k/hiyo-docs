import { ConfigProvider, Dropdown } from 'antd';
import { cloneElement } from 'react';

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
