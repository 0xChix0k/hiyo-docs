import { ConfigProvider, Form } from 'antd';
import { CusRangePicker, CusSelect, TextInput } from 'components';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';
import { useEffect } from 'react';

const SearchContent = ({ formInstance,tempData, setTempData }) => {
  const { types, dates, forms } = useSelector(selectDropdown);
  const [form] = Form.useForm();
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
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: '#5566A4',
            labelFontSize: 13,
            labelHeight: 40,
            verticalLabelPadding: '0 0 4px',
          },
        },
      }}
    >
      <Form
        form={form}
        name="searchForm"
        colon={false}
        layout="vertical"
        autoComplete="off"
        initialValues={tempData}
        style={{ marginBlock: 30, overflowY: 'auto' }}
      >
        <Form.Item label="關鍵字" name="text" size={'large'}>
          <TextInput
            value={tempData?.text}
            onChange={(v) => handleChange('text', v)}
            placeholder="輸入單號、名稱或內容"
          />
        </Form.Item>
        <Form.Item label="來自" name="from">
          <TextInput
            value={tempData?.from}
            onChange={(v) => handleChange('from', v)}
            placeholder="例：王小明"
          />
        </Form.Item>
        <Form.Item label="類型" name="type">
          <CusSelect
            value={tempData?.type}
            options={getNewOptions(types)}
            onChange={(v) => handleChange('type', v)}
          />
        </Form.Item>
        <Form.Item label="表單" name="formId">
          <CusSelect
            value={tempData?.formId}
            options={getNewOptions(forms)}
            onChange={(v) => handleChange('formId', v)}
          />
        </Form.Item>
        <Form.Item label="日期" name="date">
          <CusRangePicker
            value={tempData?.dates}
            onChange={(v) => handleChange('dates', v)}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export { SearchContent };
