import React, { useState, useMemo, useRef, forwardRef } from "react";
import type { UploadFile } from "./index";
import Form, { FormInstance } from "@/components/Form";
import Modal from "@/components/Modal";
import Select, { SelectOption } from "@/components/Select";
import { useAlbumStore } from "@/store/album";
import uploader from "@/uploader";

interface FormValue {
  bed: string;
  album: string;
}

export interface ConfigModalRef {
  show: (file: UploadFile) => void;
}

const ConfigModal = forwardRef<ConfigModalRef>((_, ref) => {
  const [title, setTitle] = useState<string>();
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance<FormValue>>(null);
  const albumList = useAlbumStore((state) => state.list);

  const albumOptions = useMemo<SelectOption[]>(() => {
    return albumList.map((it) => ({
      label: it.name,
      value: it._id,
    }));
  }, [albumList]);

  const bedOptions = useMemo<SelectOption[]>(() => {
    const beds = uploader.getPluginConfigList();
    return beds.map((it) => ({ label: it.name, value: it.id }));
  }, []);

  const handleShow = (file: UploadFile) => {
    // formRef.current?.setValue('bed', )
    console.log(file);
    setTitle(file.file.name);
    setVisible(true);
  };

  React.useImperativeHandle(ref, () => ({
    show: handleShow,
  }));

  const afterClose = () => {
    formRef.current?.reset();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      <Form form={formRef}>
        <Form.Item label="保存到指定图床" name="bed" required>
          <Select options={bedOptions} />
        </Form.Item>
        <Form.Item label="保存到指定相册" name="album" required>
          <Select options={albumOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ConfigModal;
