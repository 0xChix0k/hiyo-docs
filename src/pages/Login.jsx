/** @jsxImportSource @emotion/react */
import { Flex, Form } from 'antd';
import { ReactComponent as Logo } from 'assets/logo.svg';
import {
  CusButton,
  CusCheckBox,
  CusSelect,
  CusSpin,
  TextInput,
} from 'components';
import { useCommon, useFormCommon, useLogin } from 'hooks';
import { useEffect, useState } from 'react';
import { useGetCompanys } from 'services/dropdownService';
import { cssLogin } from './loginCss';

const Login = () => {
  const [searchStr, setSearchStr] = useState(null);
  const [failLogin, setFailLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [companys, setCompanys] = useState([]);

  const [form] = Form.useForm();
  const { onLogin, formInit } = useLogin(setLoginLoading, setFailLogin);
  const { requiredObj } = useFormCommon();
  const { debounceFn } = useCommon();
  const { data, isLoading } = useGetCompanys(searchStr);

  const onFinish = (values) => {
    onLogin(values.empNo, values.password, values.companyNo, values.remin);
  };

  useEffect(() => {
    // 如果表單的 empNo 有初始值，則立即設置 searchStr
    if (formInit.empNo) {
      setSearchStr(formInit.empNo);
    }
  }, [form, formInit.empNo]);

  useEffect(() => {
    if (!!data?.length) {
      const newList = data?.map((item) => ({
        Name: item.AliasName,
        Id: item.CompanyNo,
      }));
      setCompanys(newList);
      const comNo = form.getFieldValue('companyNo') || newList[0]?.Id;
      form.setFieldsValue({ companyNo: comNo });
    } else {
      setCompanys([]);
      form.setFieldValue('companyNo', null);
    }
  }, [data, form]);

  return (
    <Flex vertical css={cssLogin}>
      <Flex align="center" flex={'0 0 104px'} className="header">
        <Logo />
      </Flex>
      <Flex justify="center" flex={'1 1 100%'} className="content">
        <Flex vertical className="form">
          {loginLoading && <CusSpin loading={loginLoading} />}
          <div className="title">登入</div>
          <div className="sub-title">Hiyo Docs</div>
          <Form
            form={form}
            className="form"
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
            autoComplete="off"
            layout="vertical"
            initialValues={formInit}
          >
            <Form.Item name="empNo" rules={[requiredObj]}>
              <TextInput
                onChange={(v) => {
                  debounceFn(v, setSearchStr);
                }}
                placeholder="帳號 *"
                // isClear={true}
                disabled={loginLoading}
              />
            </Form.Item>
            <Form.Item name="password" rules={[requiredObj]}>
              <TextInput
                placeholder="密碼 *"
                type="password"
                // isClear={true}
                disabled={loginLoading}
              />
            </Form.Item>
            <Form.Item name="companyNo">
              <CusSelect
                options={companys}
                placeholder="公司 *"
                loading={isLoading}
                disabled={!companys?.length || loginLoading}
              />
            </Form.Item>
            <Form.Item name="remin" valuePropName="checked">
              <CusCheckBox
                label="記住登入資訊"
                disabled={loginLoading}
                bgColor="#367aff"
                tColor="#5566a4"
              />
            </Form.Item>
            <Form.Item>
              <CusButton
                text="登入"
                bgColor="#2D336B"
                htmlType="submit"
                isBlock={true}
                // loading={loginLoading}
                disabled={loginLoading}
              />
            </Form.Item>
          </Form>
          {failLogin && (
            <div className="fail">帳號或密碼不正確，請重新輸入</div>
          )}
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="center"
        flex={'0 0 30px'}
        className="footer"
      >
        © 2023, Hiyo, Inc. All Rights Reserved.
      </Flex>
    </Flex>
  );
};

export default Login;
