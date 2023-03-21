import React, { useState, forwardRef, useRef } from "react";
import { IconPhotoPlus } from "@tabler/icons-react";
import Modal from "@/components/Modal";
import Form, { FormInstance } from "@/components/Form";
import Upload from "@/components/Upload";
import Input from "@/components/Input";
import { createAlbum } from "@/request";
import { useAlbumStore } from "@/store/album";

export interface AlbumModalRef {
  show: () => void;
}

interface FormValue {
  banner: string;
  name: string;
}

const DEFAULT_FORM_VALUE: FormValue = {
  banner: "",
  name: "",
};

const AlbumModal = forwardRef<AlbumModalRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance<FormValue>>(null);
  const fetchAlbum = useAlbumStore((state) => state.fetchAlbum);

  React.useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  const handleClose = () => {
    setVisible(false);
  };

  const handleRest = () => {
    formRef.current?.reset(DEFAULT_FORM_VALUE);
  };

  const handleSubmit = async () => {
    const result = await formRef.current?.trigger();
    if (result) {
      const values = formRef.current?.getValues();
      const res = await createAlbum(values);
      if (res.code === 0) {
        fetchAlbum();
        handleClose();
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title="新增相册"
      onClose={handleClose}
      afterClose={handleRest}
      onOk={handleSubmit}
    >
      <Form<FormValue> form={formRef} defaultValues={DEFAULT_FORM_VALUE}>
        <Form.Item name="banner" label="相册封面" required>
          <Upload
            title="选择文件"
            subTitle="建议尺寸 1080*800，支持 PNG、JPG，最大 2 MB"
            icon={<IconPhotoPlus size={48} stroke={1} className="tw-mb-2" />}
            maxFiles={1}
            multiple={false}
          />
        </Form.Item>
        <Form.Item name="name" label="相册名称" required>
          <Input placeholder="请输入相册名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AlbumModal;
