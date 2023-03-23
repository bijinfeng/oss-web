import React, { useState } from "react";
import cls from "classnames";

export interface DrawerProps {
  title?: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { placement = "right", open, children, title, onClose } = props;
  const [aniVisible, setAniVisible] = useState(open);

  const handleTransitionEnd = () => {
    setAniVisible(open);
  };

  return (
    <div>
      <div
        className={cls("offcanvas", {
          "offcanvas-start": placement === "left",
          "offcanvas-end": placement === "right",
          "offcanvas-top": placement === "top",
          "offcanvas-bottom": placement === "bottom",
          showing: open && !aniVisible,
          hiding: !open && aniVisible,
          show: aniVisible,
        })}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">{title}</h2>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={onClose}
          />
        </div>
        <div className="offcanvas-body">{children}</div>
      </div>
      <div
        className={cls("offcanvas-backdrop fade", { show: open })}
        onClick={onClose}
        style={{ display: open || aniVisible ? "block" : "none" }}
      />
    </div>
  );
};

export default Drawer;
