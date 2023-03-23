import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import cls from "classnames";
import { useUpdateEffect } from "ahooks";
import i18next from "i18next";
import Button, { ButtonProps } from "@/components/Button";

interface ModalProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  afterClose?: () => void;
  onOk?: () => void;
  okButtonProps?: ButtonProps;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    visible = false,
    title,
    children,
    okButtonProps,
    onClose,
    afterClose,
    onOk,
  } = props;
  const [aniVisible, setAniVisible] = useState(visible);
  const mounted = useRef(false);

  useUpdateEffect(() => {
    if (visible) {
      setAniVisible(true);
    } else {
      setTimeout(() => {
        setAniVisible(false);
        afterClose?.();
      }, 300);
    }
  }, [visible]);

  const renderModal = () => {
    mounted.current = true;
    return (
      <div
        className={cls("modal modal-blur fade", { show: visible })}
        style={{ display: aniVisible ? "block" : "none" }}
        onClick={onClose}
      >
        <div
          className={cls("modal-backdrop fade", { show: visible })}
          style={{ zIndex: 0 }}
        />
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <Button onClick={onClose}>{i18next.t("cancel")}</Button>
              <Button type="primary" onClick={onOk} {...okButtonProps}>
                {i18next.t("ok")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (visible || mounted.current) {
    return ReactDOM.createPortal(renderModal(), document.body);
  }

  return null;
};

export default Modal;
