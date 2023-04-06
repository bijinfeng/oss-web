import React from "react";
import { IconDownload, IconX, IconTrash } from "@tabler/icons-react";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

interface FloatButtonProps {
  ids: string[];
  onClear: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = (props) => {
  const { ids, onClear } = props;

  if (ids.length === 0) return null;

  return (
    <Fab
      icon={ids.length}
      mainButtonStyles={{ backgroundColor: "var(--tblr-primary)" }}
    >
      <Action text="下载" style={{ background: "#0ca678" }}>
        <IconDownload />
      </Action>
      <Action text="删除" style={{ backgroundColor: "#d63939" }}>
        <IconTrash />
      </Action>
      <Action style={{ backgroundColor: "#616876" }} onClick={onClear}>
        <IconX />
      </Action>
    </Fab>
  );
};

export default FloatButton;
