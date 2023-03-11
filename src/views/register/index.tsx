import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import LoginLayout from "@/layout/LoginLayout";
import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { signUp, ResDataBase } from "@/request";
import useUserStore from "@/store/user";
import type { UserInfo } from "@/interface";

interface FormValue {
  name: string;
  email: string;
  password: string;
}

type SignupRes = ResDataBase<UserInfo>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      setLoading(true);
      try {
        const res = await signUp<SignupRes>(values);
        console.log(res);

        if (res.data.code !== 0) {
          console.log(res.data.message);
        } else {
          setUserInfo(res.data.data);
          navigate("/main");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <LoginLayout
      title="Create new account"
      description={
        <>
          Already have account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <Form<FormValue> form={formRef}>
        <Form.Item label="Name" name="name" rules={{ required: "请填写邮箱" }}>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          rules={{ required: "请填写邮箱" }}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={{ required: "请填写密码" }}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <div className="form-footer">
          <Button loading={loading} type="primary" block onClick={handleSubmit}>
            Create new account
          </Button>
        </div>
      </Form>
    </LoginLayout>
  );
};

export default Register;
