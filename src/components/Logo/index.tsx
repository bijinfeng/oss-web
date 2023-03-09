import React from "react";
import cls from "classnames";
import icon from "@/assets/icon.png";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <a
      {...props}
      className={cls(
        props.className,
        "tw-inline-flex tw-items-center tw-gap-2 navbar-brand"
      )}
    >
      <img src={icon} height="36" alt="" />
      <span className="tw-text-lg">OSS Web</span>
    </a>
  );
};

export default Logo;
