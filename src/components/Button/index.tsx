import React from "react";
import cls from "classnames";
import { Link } from "react-router-dom";

import type { Color } from "@/interface/enums";

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "onClick"
  > {
  disabled?: boolean;
  ghost?: boolean;
  icon?: React.ReactElement;
  loading?: boolean;
  href?: string;
  shape?: "circle" | "round" | "square";
  outline?: boolean;
  size?: "small" | "medium" | "large";
  color?: Color;
  block?: boolean;
  type?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "dark"
    | "light";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type,
    href,
    disabled,
    color,
    ghost,
    shape,
    outline,
    size,
    icon,
    loading,
    onClick,
    className,
    style,
    block,
    ...rest
  } = props;

  const ele = href ? <Link to={href} /> : <button />;

  const getClassName = () => {
    return cls(className, "btn", {
      [`btn${outline ? "-outline" : ""}${ghost ? "-ghost" : ""}-${type}`]: type,
      [`btn-${color}`]: color,
      disabled: disabled,
      "btn-square": shape === "square",
      "btn-pill": shape === "round",
      "btn-lg": size === "large",
      "btn-sm": size === "small",
      "btn-icon": !!icon && !children,
      "btn-loading": loading,
      "w-100": block,
    });
  };

  const renderChildren = () => (
    <>
      {icon &&
        React.cloneElement(icon, {
          className: cls(icon.props.className, "icon"),
        })}
      {children}
    </>
  );

  return React.cloneElement(
    ele,
    {
      ...rest,
      style,
      className: getClassName(),
      disabled,
      onClick,
    },
    renderChildren()
  );
};

export default Button;
