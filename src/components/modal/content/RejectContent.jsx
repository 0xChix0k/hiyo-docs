import { Form } from 'antd';
import { TextInput } from 'components';
import { useFormCommon } from 'hooks';
import { useEffect } from 'react';

const RejectContent = ({ formInstance, remark, setRemark }) => {
  const { requiredObj } = useFormCommon();
  const [form] = Form.useForm();

  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      style={{ marginTop: 20 }}
    >
      <Form.Item name="remark" rules={[requiredObj]}>
        <TextInput
          value={remark}
          onChange={(v) => setRemark(v)}
          placeholder="退件原因 *"
          isClear={true}
          isArea={true}
          areaSize={4}
        />
      </Form.Item>
    </Form>
  );
};
export { RejectContent };
