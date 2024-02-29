import { ConfigProvider, Form } from 'antd';
import { CusSelect, TextInput } from 'components';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const SearchContent = ({ tempData, setTempData }) => {
  const { types, dates } = useSelector(selectDropdown);

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
            options={types}
            onChange={(v) => handleChange('type', v)}
          />
        </Form.Item>
        <Form.Item label="表單" name="formId">
          <TextInput
            value={tempData?.formId}
            onChange={(v) => handleChange('formId', v)}
            placeholder="請選擇"
          />
        </Form.Item>
        <Form.Item label="日期" name="date">
          <TextInput
            value={tempData?.date}
            onChange={(v) => handleChange('date', v)}
            placeholder="請選擇"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export { SearchContent };
