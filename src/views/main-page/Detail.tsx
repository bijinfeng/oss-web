import { forwardRef, useState, useImperativeHandle } from "react";
import Drawer from "@/components/Drawer";
import { FileInfo } from "@/interface";

export interface DetailRef {
  show: (fileInfo: FileInfo) => void;
}

const Detail = forwardRef<DetailRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useImperativeHandle(ref, () => ({
    show: ($fileInfo) => {
      setFileInfo($fileInfo);
      setVisible(true);
    },
  }));

  const onClose = () => {
    setVisible(false);
  };

  if (!fileInfo) return null;

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      style={{ width: "40%", minWidth: 650 }}
      title={fileInfo.name}
    >
      <div
        className="tw-bg-cover"
        style={{ backgroundImage: `url(${fileInfo.url})`, height: 300 }}
      />
    </Drawer>
  );
});

export default Detail;
