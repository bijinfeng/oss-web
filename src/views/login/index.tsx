import React, { useRef } from "react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Logo from "@/components/Logo";
import loginSecure from "@/assets/undraw_secure_login_pdn4.svg";

import { login } from "@/request";

const GITHUB_OAUTH_URL =
  "https://github.com/login/oauth/authorize?client_id=aa06b4211fb6edb3a869&redirect_uri=https://iqqgucwq2n.hk.aircode.run/user_oauth_callback&scope=user:email";

interface FormValue {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      const res = await login(values);
      console.log(res);
      navigate("/main");
    }
  };

  return (
    <div className="page page-center">
      <div className="container container-normal py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg">
            <div className="container-tight">
              <div className="text-center mb-4">
                <Logo />
              </div>
              <div className="card card-md">
                <div className="card-body">
                  <h2 className="h2 text-center mb-4">Login to your account</h2>
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
                      labelSuffix={
                        <a href="./forgot-password.html">I forgot password</a>
                      }
                    >
                      <Input type="password" placeholder="Your password" />
                    </Form.Item>
                    <Form.Item name="remember" noStyle className="mb-2">
                      <Checkbox>Remember me on this device</Checkbox>
                    </Form.Item>
                    <div className="form-footer">
                      <Button type="primary" block onClick={handleSubmit}>
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </div>
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
              </div>
              <div className="text-center text-muted mt-3">
                Don&apos;t have account yet?
                <a href="./sign-up.html" tabIndex={-1}>
                  Sign up
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg d-none d-lg-block">
            <img
              src={loginSecure}
              height="300"
              className="d-block mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
