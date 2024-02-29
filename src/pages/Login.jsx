/** @jsxImportSource @emotion/react */
import { Flex, Form } from 'antd';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { CusButton, CusCheckBox, TextInput } from 'components';
import { useLogin } from 'hooks';
import { useState } from 'react';
import { cssLogin } from './loginCss';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [remin, setRemin] = useState(false);
  const [failLogin, setFailLogin] = useState(false);

  const { onCheck } = useLogin(userId, password, remin, setFailLogin);
  const onFinish = (values) => {
    onCheck();
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
            className="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="userId"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <TextInput
                value={userId}
                onChange={setUserId}
                placeholder="帳號"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <TextInput
                value={password}
                onChange={setPassword}
                placeholder="密碼"
                type="password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="remin">
              <CusCheckBox
                label="記住登入資訊"
                checked={remin}
                onChange={setRemin}
              />
            </Form.Item>
            <Form.Item>
              <CusButton
                text="登入"
                bgColor="#2D336B"
                htmlType="submit"
                isBlock={true}
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
