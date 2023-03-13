import React from "react";
import Tabs, { TabItem } from "@/components/Tabs";
import Button from "@/components/Button";
// import Form from "@/components/Form";

const items: TabItem[] = [
  {
    key: "default",
    label: "默认图床",
    children: "xxx",
  },
];

const BedSetting: React.FC = () => {
  const renderFooter = () => (
    <div className="btn-list justify-content-end">
      <Button>Cancel</Button>
      <Button type="primary">Submit</Button>
    </div>
  );

  return (
    <Tabs
      items={items}
      footer={renderFooter()}
      footerClassName="bg-transparent mt-auto"
      border={false}
    />
  );
};

export default BedSetting;
