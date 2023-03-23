import { forwardRef, useState, useImperativeHandle } from "react";
import Drawer from "@/components/Drawer";

export interface DetailRef {
  show: () => void;
}

const Detail = forwardRef<DetailRef>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer open={visible} onClose={onClose}>
      xxxx
    </Drawer>
  );
});

export default Detail;
