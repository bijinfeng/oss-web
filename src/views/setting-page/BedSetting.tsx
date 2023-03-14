import React, { useState, useMemo, useRef, forwardRef } from "react";
import Tabs, { TabItem } from "@/components/Tabs";
import Button from "@/components/Button";
import Form, { FormInstance } from "@/components/Form";
import Input from "@/components/Input";
import uploader from "@/uploader";
import type { IConfig } from "@/uploader/interface";
import { notification } from "@/components/Notification";

type BedSchema = ReturnType<typeof uploader.getPluginConfigList>[0];

interface ContentRef {
  validate: () => Promise<boolean>; // 检验表单
  reset: () => void; // 重置表单
  getValues: () => any; // 获取表单的值
}

interface ContentProps {
  schema: BedSchema;
}

const Content = forwardRef<ContentRef, ContentProps>(({ schema }, ref) => {
  const formRef = useRef<FormInstance>(null);
  const defaultValues = useMemo(() => {
    return schema.config.reduce((result: Record<string, any>, item) => {
      result[item.name] = item.default;
      return result;
    }, {});
  }, [schema]);

  React.useImperativeHandle(ref, () => ({
    validate: formRef.current!.trigger,
    reset: () => formRef.current?.reset(),
    getValues: () => formRef.current?.getValues(),
  }));

  const renderItem = (item: (typeof schema.config)[0]) => {
    switch (item.type) {
      case "input":
        return <Input placeholder={item.message} />;
      case "password":
        return <Input type="password" placeholder={item.message} />;
      default:
        break;
    }

    return null;
  };

  return (
    <Form form={formRef} defaultValues={defaultValues}>
      {schema.config.map((item) => (
        <Form.Item
          key={item.name}
          name={item.name}
          label={item.alias || item.name}
          rules={{ required: item.required && "必填项不能为空" }}
        >
          {renderItem(item)}
        </Form.Item>
      ))}
    </Form>
  );
});

/**
 * 图床设置
 */
const BedSetting: React.FC = () => {
  const [beds] = useState(() => uploader.getPluginConfigList());
  const [activeKey, setActiveKey] = useState(() => beds[0].id);
  const formRefs = useRef<Record<string, ContentRef>>({});

  const items = useMemo<TabItem[]>(() => {
    const setRef = (ref: ContentRef, item: (typeof beds)[0]) => {
      formRefs.current[item.id] = ref;
    };

    return beds.map((item) => ({
      key: item.id,
      label: item.name,
      children: (
        <Content schema={item} ref={(r: ContentRef) => setRef(r, item)} />
      ),
    }));
  }, [beds]);

  const handleSubmit = async () => {
    const validateSuccess = await formRefs.current[activeKey].validate();
    if (validateSuccess) {
      const values = formRefs.current[activeKey].getValues();
      const oldConfig = uploader.getConfig<IConfig["bed"]>("bed");
      uploader.setConfig({ bed: { ...oldConfig, [activeKey]: values } });
      notification.success({ title: "图床配置", content: "修改配置成功！" });
    }
  };

  const handleCancel = () => {
    formRefs.current[activeKey].reset();
  };

  const renderFooter = () => (
    <div className="btn-list justify-content-end">
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );

  return (
    <Tabs
      value={activeKey}
      onChange={setActiveKey}
      items={items}
      footer={renderFooter()}
      footerClassName="bg-transparent mt-auto"
      border={false}
      pill
    />
  );
};

export default BedSetting;
