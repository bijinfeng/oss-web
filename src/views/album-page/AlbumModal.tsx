import React, { useState, forwardRef } from "react";
import { IconPhotoPlus } from "@tabler/icons-react";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import Upload from "@/components/Upload";
import Input from "@/components/Input";

export interface AlbumModalRef {
  show: () => void;
}

const AlbumModal = forwardRef<AlbumModalRef>((_, ref) => {
  const [visible, setVisible] = useState(false);

  React.useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  return (
    <Modal visible={visible} title="新增相册" onClose={() => setVisible(false)}>
      <Form>
        <Form.Item name="banner" label="相册封面" required>
          <Upload
            title="选择文件"
            subTitle="建议尺寸 1080*800，支持 PNG、JPG，最大 2 MB"
            icon={<IconPhotoPlus size={48} stroke={1} className="tw-mb-2" />}
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
