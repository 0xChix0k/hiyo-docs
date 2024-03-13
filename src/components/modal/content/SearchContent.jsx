import { Form } from 'antd';
import { CusRangePicker, CusSelect, TextInput } from 'components';
import { useDateOption } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const SearchContent = ({ formInstance, tempData, setTempData }) => {
  const { types, forms } = useSelector(selectDropdown);
  const [form] = Form.useForm();
  const [cusName, setCusName] = useState('日期範圍');

  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);
  const getNewOptions = (arr) => {
    return [
      {
        Id: 'all',
        Name: '全部',
      },
      ...arr,
    ];
  };
  const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
    form.setFieldValue({ [field]: value });
  };

  const [isOpen, setIsOpen] = useState(false);
  const { searchDates } = useDateOption(cusName);
  const onDateChange = (v) => {
    const range = searchDates.find((item) => item.Id === v)?.DValue || [];
    setTempData({ ...tempData, sDate: range[0], eDate: range[1], dateId: v });
    form.setFieldValue({ dateId: v });
  };
  const onDateSelect = (v) => {
    if (v === 'custom') {
      setIsOpen(true);
    } else {
      setCusName('日期範圍');
    }
  };

  return (
    <Form
      form={form}
      name="searchForm"
      colon={false}
      layout="vertical"
      autoComplete="off"
      style={{ overflowY: 'auto' }}
    >
      <Form.Item
        label="關鍵字"
        name="text"
        size={'large'}
        initialValue={tempData?.text}
      >
        <TextInput
          value={tempData?.text}
          onChange={(v) => handleChange('text', v)}
          placeholder="輸入單號、名稱或內容"
        />
      </Form.Item>
      <Form.Item label="來自" name="from" initialValue={tempData?.from}>
        <TextInput
          value={tempData?.from}
          onChange={(v) => handleChange('from', v)}
          placeholder="例：王小明"
        />
      </Form.Item>
      <Form.Item label="類型" name="typeId" initialValue={tempData?.typeId}>
        <CusSelect
          value={tempData?.typeId}
          options={getNewOptions(types)}
          onChange={(v) => handleChange('typeId', v)}
        />
      </Form.Item>
      <Form.Item label="表單" name="formId" initialValue={tempData?.formId}>
        <CusSelect
          value={tempData?.formId}
          options={getNewOptions(forms)}
          onChange={(v) => handleChange('formId', v)}
        />
      </Form.Item>
      <Form.Item label="日期" name="date" initialValue={tempData?.dates}>
        <div>
          <CusRangePicker
            value={[tempData?.sDate, tempData?.eDate]}
            onChange={(v) => {
              handleChange('sDate', v[0]);
              handleChange('eDate', v[1]);
              setCusName(v[0] + ' ~ ' + v[1]);
            }}
            isHiddenInput={true}
            openTrigger={true}
            isOpen={isOpen}
            setOpen={setIsOpen}
          />
          <CusSelect
            value={tempData?.dateId}
            options={searchDates}
            onChange={onDateChange}
            onSelect={onDateSelect}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export { SearchContent };
