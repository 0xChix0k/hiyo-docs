import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFormCommon } from 'hooks';
import { TextInput } from 'components';

const RenameContent = ({ formInstance, name }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (formInstance) {
      formInstance.current = form; // 將表單實例暴露給父組件
    }
  }, [form, formInstance]);
  const [fName, setFName] = useState(name);
  const { requiredObj } = useFormCommon();

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Form.Item name="folderName" rules={[requiredObj]} initialValue={fName}>
        <TextInput
          value={fName}
          onChange={(v) => setFName(v)}
          placeholder="分類名稱 * "
        />
      </Form.Item>
    </Form>
  );
};

export { RenameContent };
