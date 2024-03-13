/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Form } from 'antd';
import { CusCheckBox, CusDatePicker, CusSelect, CusUserM } from 'components';
import updateTimes from 'data/dropdown/updateTime.json';
import dayjs from 'dayjs';
import { useFormCommon } from 'hooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDropdown } from 'store/dropdownSlice';

const FormsetS1Content = React.forwardRef(({ data, setData }, ref) => {
  const { types } = useSelector(selectDropdown);
  const { requiredObj } = useFormCommon();
  const [form] = Form.useForm();
  useEffect(() => {
    if (ref) {
      ref.current = form; // 將表單實例暴露給父組件
    }
  }, [form, ref]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  useEffect(() => {
    if (!data?.IsUpdateUser) {
      form.setFieldsValue({ UpdateUser: data.UpdateUser });
      setData({ ...data, UpdateUser: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.IsUpdateUser, form, setData]);

  return (
    <Flex vertical flex="1 1 auto" css={cssFormSetContent}>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Form.Item
          name="TypeId"
          label="類型"
          rules={[requiredObj]}
          initialValue={data?.TypeId || 'policy'}
          style={{
            // display: 'inline-block',
            width: 'calc(50% - 12px)',
          }}
        >
          <CusSelect
            value={data?.TypeId || 'policy'}
            options={types}
            onChange={(v) => setData({ ...data, TypeId: v })}
            placeholder="類型 *"
          />
        </Form.Item>
        <Form.Item
          name="StartDate"
          label="表單起始日"
          rules={[requiredObj]}
          initialValue={data?.StartDate ? dayjs(data?.StartDate) : dayjs()}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 12px)',
            marginRight: '24px',
          }}
        >
          <CusDatePicker
            value={data?.StartDate ? dayjs(data?.StartDate) : dayjs()}
            onChange={(v) => setData({ ...data, StartDate: v })}
          />
        </Form.Item>
        <Form.Item
          name="UpTime"
          label="更新頻率"
          rules={[requiredObj]}
          initialValue={data?.UpTime}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 12px)',
          }}
        >
          <CusSelect
            value={data.UpTime}
            options={updateTimes}
            onChange={(v) => setData({ ...data, UpTime: v })}
            placeholder="更新頻率 *"
          />
        </Form.Item>
        <div style={{ marginBlock: '-16px 8px', color: 'var(--grey-60)' }}>
          更新頻率將根據此表格的開始日期計算。
        </div>
        <Form.Item
          name="IsUpdateUser"
          valuePropName="checked"
          initialValue={data?.UpTime}
          className="no-min-height"
        >
          <CusCheckBox
            checked={data.IsUpdateUser}
            onChange={(v) => setData({ ...data, IsUpdateUser: v })}
            label="指派更新人員"
          />
        </Form.Item>
        {data?.IsUpdateUser && (
          <Form.Item
            name="UpdateUser"
            rules={[
              {
                required: data?.IsUpdateUser,
                message: '必填',
              },
            ]}
            style={{ marginTop: -16 }}
            initialValue={data?.UpdateUser}
          >
            <CusUserM
              value={data?.UpdateUser}
              onChange={(v) => setData({ ...data, UpdateUser: v })}
              placeholder="選擇人員 ( 可複選 )"
            />
          </Form.Item>
        )}
        <div className="des">權限</div>
        <Form.Item
          name="IsAllRead"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
          className="no-min-height"
          initialValue={data?.IsAllRead}
        >
          <CusCheckBox
            checked={data?.IsAllRead}
            onChange={(v) => setData({ ...data, IsAllRead: v })}
            label="所有人必須閱覽此表單中的文件"
          />
        </Form.Item>
        <Form.Item
          name="IsDownload"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
          className="no-min-height"
          initialValue={data?.IsDownload}
        >
          <CusCheckBox
            checked={data?.IsDownload}
            onChange={(v) => setData({ ...data, IsDownload: v })}
            label="允許下載"
          />
        </Form.Item>
        <Form.Item
          name="IsPrint"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
          className="no-min-height"
          initialValue={data?.IsPrint}
        >
          <CusCheckBox
            checked={data?.IsPrint}
            onChange={(v) => setData({ ...data, IsPrint: v })}
            label="允許列印"
          />
        </Form.Item>
      </Form>
    </Flex>
  );
});
export { FormsetS1Content };

const cssFormSetContent = css`
  overflow-y: auto;
  .des {
    font-size: 13px;
    font-weight: 600;
    color: var(--grey-50);
    margin-bottom: 8px;
  }
  .ant-form-item {
    :is(.no-min-height) {
      .ant-form-item-control-input {
        min-height: auto !important;
      }
    }
  }
`;
