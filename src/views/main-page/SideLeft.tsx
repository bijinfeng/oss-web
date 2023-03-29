import React, { useMemo, useRef } from "react";
import i18next from "i18next";

import Form, { FormInstance } from "@/components/Form";
import Checkbox, { GroupProps } from "@/components/Checkbox";
import { useAlbumStore } from "@/store/album";
import uploader from "@/uploader";

interface FormValue {
  bed?: string[];
  album?: string[];
}

export interface SidebarProps {
  value: FormValue;
  onChange: (value: FormValue) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { value, onChange } = props;
  const albumList = useAlbumStore((state) => state.list);
  const formRef = useRef<FormInstance<FormValue>>(null);

  const albumOptions = useMemo<GroupProps["options"]>(() => {
    return albumList.map((it) => ({
      label: it.name,
      value: it._id,
    }));
  }, [albumList]);

  const bedOptions = useMemo<GroupProps["options"]>(() => {
    const beds = uploader.getPluginConfigList();
    return beds.map((it) => ({ label: it.name, value: it.id }));
  }, []);

  return (
    <Form form={formRef} defaultValues={value} onChange={onChange}>
      <Form.Item className="mb-4" label={i18next.t("imageHosting")} name="bed">
        <Checkbox.Group options={bedOptions} />
      </Form.Item>
      <Form.Item className="mb-4" label={i18next.t("album")} name="album">
        <Checkbox.Group options={albumOptions} />
      </Form.Item>
    </Form>
  );
};

export default Sidebar;
