import React, { PropsWithChildren } from "react";
import cls from "classnames";

interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Card: React.FC<PropsWithChildren<CardProps>> = (props) => {
  const { children, title, style, className, size } = props;

  return (
    <div
      className={cls(className, "card", {
        "card-sm": size === "small",
        "card-md": size === "medium",
        "card-lg": size === "large",
      })}
      style={style}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
