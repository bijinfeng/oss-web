import React from "react";
import cls from "classnames";

import type { Color } from "@/interface/enums";

interface SpinnerProps {
  color?: Color;
  size?: "small" | "default";
  growing?: boolean;
  dots?: boolean;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { color, size, growing, dots } = props;

  if (dots) return <span className="animated-dots" />;

  return (
    <div
      className={cls({
        [`text-${color}`]: color,
        "spinner-border-sm": size === "small",
        "spinner-grow": growing,
        "spinner-border": !growing,
      })}
      role="status"
    />
  );
};

export default Spinner;
