import React from "react";
import Form from "@/components/Form";
import Checkbox from "@/components/Checkbox";

export interface Bed {
  name: string;
  total: number;
}

interface SidebarProps {
  beds: Bed[];
}

const Sidebar: React.FC<SidebarProps> = ({ beds }) => {
  return (
    <Form>
      <Form.Item className="mb-4" label="图床" name="bed">
        <Checkbox.Group
          options={beds.map((it) => ({ label: it.name, value: it.name }))}
        />
      </Form.Item>
      <Form.Item className="mb-4" label="相册" name="album">
        <Checkbox.Group
          options={beds.map((it) => ({ label: it.name, value: it.name }))}
        />
      </Form.Item>
    </Form>
  );
};

export default Sidebar;
