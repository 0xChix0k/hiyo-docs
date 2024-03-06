/**@jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { CapsuleTabs, CusRangePicker, CusSelect } from 'components';
import { useDateOption } from 'hooks';
import { useState } from 'react';
import { cssMyForm } from './myFormCss';

const MyForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formDates, setFormDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [SelectId, setSelectId] = useState('b1m');
  const { myFormDates } = useDateOption(formDates);

  const onDateChange = (v) => {
    setSelectId(v);
  };
  const onDateSelect = (v) => {
    if (v === 'custom') {
      setIsOpen(true);
    }
  };

  return (
    <Flex vertical align="center" css={cssMyForm}>
      <Flex vertical gap={30} className="my-form-container">
        <Flex align="center" className="title">
          我的表單
        </Flex>
        <Flex vertical gap={20} className="form-div">
          <Flex justify="space-between" align="center" className="tool-div">
            <CapsuleTabs
              tabs={['簽核中', '已核准']}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <div>
              <CusRangePicker
                value={formDates}
                onChange={(v) => setFormDates(v)}
                isHiddenInput={true}
                openTrigger={true}
                isOpen={isOpen}
                setOpen={setIsOpen}
              />
              <div style={{ width: 240 }}>
                <CusSelect
                  value={SelectId}
                  options={myFormDates}
                  onChange={onDateChange}
                  onSelect={onDateSelect}
                />
              </div>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyForm;
