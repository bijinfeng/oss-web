import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { IconMail } from "@tabler/icons-react";
import LoginLayout from "@/layout/LoginLayout";
import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface FormValue {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      console.log(values);
    }
  };

  return (
    <LoginLayout
      title="Forgot password"
      subTitle="Enter your email address and your password will be reset and emailed to you."
      description={
        <>
          Forget it, <Link to="/login">send me back</Link> to the sign in
          screen.
        </>
      }
    >
      <Form<FormValue> form={formRef}>
        <Form.Item label="Email address" name="email" required>
          <Input placeholder="Enter email" />
        </Form.Item>
      </Form>
      <div className="form-footer">
        <Button type="primary" block icon={<IconMail />} onClick={handleSubmit}>
          Send me new password
        </Button>
      </div>
    </LoginLayout>
  );
};

export default ForgetPassword;
