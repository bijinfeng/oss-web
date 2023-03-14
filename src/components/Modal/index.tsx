import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cls from "classnames";
import Button from "@/components/Button";

interface ModalProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { visible = false, title, children, onClose } = props;
  const [aniVisible, setAniVisible] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (visible) {
      setAniVisible(true);
    } else {
      setTimeout(() => setAniVisible(false), 300);
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
              <Button className="me-auto" onClick={onClose}>
                Close
              </Button>
              <Button type="primary">Save</Button>
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
