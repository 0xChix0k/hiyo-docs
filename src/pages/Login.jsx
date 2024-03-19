/** @jsxImportSource @emotion/react */
import { Flex, Form } from 'antd';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { CusButton, CusCheckBox, CusSelect, TextInput } from 'components';
import { useCommon, useFormCommon, useLogin } from 'hooks';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useGetCompany } from 'services/loginService';
import { cssLogin } from './loginCss';

const Login = () => {
  const [userId, setUserId] = useState(Cookies.get('userId') || '');
  const [password, setPassword] = useState(Cookies.get('password') || '');
  const [searchStr, setSearchStr] = useState('');
  const [companyId, setCompanyId] = useState(Cookies.get('company') || null);
  const [remin, setRemin] = useState(Cookies.get('userId') ? true : false);
  const [failLogin, setFailLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const { onCheck } = useLogin(
    userId,
    password,
    companyId,
    remin,
    setLoginLoading,
    setFailLogin
  );
  const { requiredObj } = useFormCommon();
  const { debounceFn } = useCommon();
  const [form] = Form.useForm();
  const { data: companys, isLoading } = useGetCompany(searchStr);

  useEffect(() => {
    setSearchStr(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCompanyId(companys && !!companys?.length ? companys[0]?.Id : null);
    form.setFieldValue('companyId', companyId);
  }, [companyId, companys, form]);

  return (
    <Flex vertical css={cssLogin}>
      <Flex align="center" flex={'0 0 104px'} className="header">
        <Logo />
      </Flex>
      <Flex justify="center" flex={'1 1 100%'} className="content">
        <Flex vertical className="form">
          <div className="title">登入</div>
          <div className="sub-title">Hiyo Docs</div>
          <Form
            form={form}
            className="form"
            onFinish={(values) => onCheck()}
            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="userId"
              initialValue={userId}
              rules={[requiredObj]}
            >
              <TextInput
                value={userId}
                onChange={(v) => {
                  setUserId(v);
                  debounceFn(v, setSearchStr);
                }}
                placeholder="帳號 *"
                disabled={loginLoading}
              />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue={password}
              rules={[requiredObj]}
            >
              <TextInput
                value={password}
                onChange={setPassword}
                placeholder="密碼 *"
                type="password"
                disabled={loginLoading}
              />
            </Form.Item>
            <Form.Item name="companyId">
              <CusSelect
                options={companys}
                value={companyId}
                placeholder="公司"
                onChange={setCompanyId}
                loading={isLoading}
                disabled={!companys?.length || loginLoading}
              />
            </Form.Item>
            <Form.Item name="remember" initialValue={remin}>
              <CusCheckBox
                label="記住登入資訊"
                checked={remin}
                onChange={setRemin}
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
                loading={loginLoading}
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
