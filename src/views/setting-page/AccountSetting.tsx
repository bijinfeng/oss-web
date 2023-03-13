import React from "react";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Select, { SelectOption } from "@/components/Select";

const bedOptions: SelectOption[] = [
  {
    label: "默认图床",
    value: "default",
  },
  {
    label: "七牛云",
    value: "qiliuyun",
  },
];

const albumOptions: SelectOption[] = [
  {
    label: "默认相册",
    value: "default",
  },
];

const AccountSetting: React.FC = () => {
  return (
    <Form>
      <div className="card-body">
        <h2 className="mb-4">My Account</h2>
        <Form.Item name="avatar" label="Avatar">
          <Avatar name="test" size="xl" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <p>2804673379@qq.com</p>
        </Form.Item>
        <Form.Item name="name" label="User Name">
          <p>kebai</p>
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password />
        </Form.Item>
        <div className="tw-flex tw-gap-5">
          <Form.Item name="bed" label="默认上传策略" className="tw-flex-1">
            <Select options={bedOptions} />
          </Form.Item>
          <Form.Item name="album" label="默认上传相册" className="tw-flex-1">
            <Select options={albumOptions} />
          </Form.Item>
        </div>
      </div>
      <div className="card-footer bg-transparent mt-auto">
        <div className="btn-list justify-content-end">
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </div>
      </div>
    </Form>
  );
};

export default AccountSetting;
