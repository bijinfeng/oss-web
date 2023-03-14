import React from "react";
import cls from "classnames";
import {
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertCircle,
} from "@tabler/icons-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  content?: React.ReactNode;
  type?: "success" | "info" | "warning" | "error";
  closable?: boolean;
  widthIcon?: boolean;
  icon?: React.ReactNode;
  avatar?: string;
  important?: boolean;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    content,
    type = "info",
    closable,
    widthIcon,
    icon,
    avatar,
    important,
    onClose,
    className,
    ...rest
  } = props;
  const hasIcon = widthIcon || icon;

  const renderIcon = () => {
    let iconComponent = icon;
    if (!icon) {
      switch (type) {
        case "success":
          iconComponent = <IconCheck />;
          break;
        case "info":
          iconComponent = <IconInfoCircle />;
          break;
        case "warning":
          iconComponent = <IconAlertTriangle />;
          break;
        default:
          iconComponent = <IconAlertCircle />;
          break;
      }
    }

    if (!React.isValidElement(iconComponent)) return iconComponent;

    return React.cloneElement<{ className: string }>(
      iconComponent as React.ReactElement<{ className: string }>,
      { className: cls(iconComponent?.props?.className, "icon alert-icon") }
    );
  };

  return (
    <div
      className={cls(
        "alert",
        {
          "alert-success": type === "success",
          "alert-info": type === "info",
          "alert-alert-warning": type === "warning",
          "alert-danger": type === "error",
          "alert-dismissible": !!closable,
          "alert-important": !!important,
        },
        className
      )}
      {...rest}
    >
      <div className="d-flex">
        {hasIcon && <div>{renderIcon()}</div>}
        {avatar && (
          <div>
            <span
              className="avatar float-start me-3"
              style={{ backgroundImage: `url(${avatar})` }}
            />
          </div>
        )}
        <div>
          {title && <h4 className="alert-title">{title}</h4>}
          {content && <div className="text-muted">{content}</div>}
        </div>
        {closable && <a className="btn-close" onClick={onClose} />}
      </div>
    </div>
  );
};

export default Alert;
