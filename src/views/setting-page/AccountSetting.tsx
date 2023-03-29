import React, { useState, useMemo, useRef } from "react";
import i18next from "i18next";

import Button from "@/components/Button";
import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import Select, { SelectOption } from "@/components/Select";
import AvatarUpload from "@/components/Upload/AvatarUpload";
import uploader from "@/uploader";
import useUserStore from "@/store/user";
import { useAlbumStore } from "@/store/album";

interface FormValue {
  avatar?: string;
  bed: string;
}

const languageOptions: SelectOption[] = [
  {
    label: "中文",
    value: "chinese",
  },
  {
    label: "英语",
    value: "english",
  },
];

const AccountSetting: React.FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const albumList = useAlbumStore((state) => state.list);
  const formRef = useRef<FormInstance<FormValue>>(null);
  const [beds] = useState(() => uploader.getPluginConfigList());

  const bedOptions = useMemo<SelectOption[]>(() => {
    return beds.map((bed) => ({ label: bed.name, value: bed.id }));
  }, [beds]);

  const albumOptions = useMemo<SelectOption[]>(() => {
    return albumList.map((it) => ({
      label: it.name,
      value: it._id,
    }));
  }, [albumList]);

  const defaultValues = useMemo<FormValue>(() => {
    return {
      avatar: userInfo?.avatar,
      bed: uploader.getConfig<string>("currentBed"),
    };
  }, [userInfo]);

  const handleCancel = () => {
    formRef.current?.reset();
  };

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      console.log(values);
    }
  };

  return (
    <Form form={formRef} defaultValues={defaultValues}>
      <div className="card-body">
        <h2 className="mb-4">My Account</h2>
        <Form.Item name="avatar" label={i18next.t("avatar")}>
          <AvatarUpload />
        </Form.Item>
        <Form.Item name="email" label={i18next.t("email")}>
          <p>2804673379@qq.com</p>
        </Form.Item>
        <Form.Item name="name" label={i18next.t("userName")}>
          <p>kebai</p>
        </Form.Item>
        <Form.Item name="password" label={i18next.t("password")} required>
          <Input.Password />
        </Form.Item>
        <div className="tw-flex tw-gap-5">
          <Form.Item
            name="bed"
            label="默认上传策略"
            className="tw-flex-1"
            required
          >
            <Select options={bedOptions} />
          </Form.Item>
          <Form.Item
            name="album"
            label="默认上传相册"
            className="tw-flex-1"
            required
          >
            <Select options={albumOptions} />
          </Form.Item>
        </div>
        <Form.Item name="language" label={i18next.t("language")} required>
          <Select options={languageOptions} />
        </Form.Item>
      </div>
      <div className="card-footer bg-transparent mt-auto">
        <div className="btn-list justify-content-end">
          <Button onClick={handleCancel}>{i18next.t("cancel")}</Button>
          <Button type="primary" onClick={handleSubmit}>
            {i18next.t("submit")}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AccountSetting;
