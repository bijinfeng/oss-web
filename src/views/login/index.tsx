import React, { useRef, useState } from "react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { useNavigate, Link } from "react-router-dom";

import LoginLayout from "@/layout/LoginLayout";
import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";

import { login, ResDataBase } from "@/request";
import useUserStore from "@/store/user";
import type { UserInfo } from "@/interface";
const GITHUB_OAUTH_URL =
  "https://github.com/login/oauth/authorize?client_id=aa06b4211fb6edb3a869&redirect_uri=https://iqqgucwq2n.hk.aircode.run/user_oauth_callback&scope=user:email";

interface FormValue {
  email: string;
  password: string;
  remember: boolean;
}

type LoginRes = ResDataBase<UserInfo>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useUserStore();
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      try {
        setLoading(true);
        const res = await login<LoginRes>(values);
        if (res.data.code === 0) {
          setUserInfo(res.data.data);
          navigate("/main");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <>
      <div className="hr-text">or</div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <Button
              href={GITHUB_OAUTH_URL}
              icon={<IconBrandGithub className="text-github" />}
              block
            >
              Login with Github
            </Button>
          </div>
          <div className="col">
            <Button
              href="#"
              icon={<IconBrandTwitter className="text-twitter" />}
              block
            >
              Login with Twitter
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <LoginLayout
      title="Login to your account"
      footer={renderFooter()}
      description={
        <>
          Don&apos;t have account yet? <Link to="/register">Sign up</Link>
        </>
      }
    >
      <Form<FormValue> form={formRef}>
        <Form.Item
          label="Email address"
          name="email"
          rules={{ required: "请填写邮箱" }}
        >
          <Input type="email" placeholder="your@email.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={{ required: "请填写密码" }}
          labelSuffix={<a href="./forgot-password.html">I forgot password</a>}
        >
          <Input type="password" placeholder="Your password" />
        </Form.Item>
        <Form.Item name="remember" noStyle className="mb-2">
          <Checkbox>Remember me on this device</Checkbox>
        </Form.Item>
        <div className="form-footer">
          <Button loading={loading} type="primary" block onClick={handleSubmit}>
            Sign in
          </Button>
        </div>
      </Form>
    </LoginLayout>
  );
};

export default Login;
