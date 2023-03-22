import React from "react";
import cls from "classnames";
import { Link } from "react-router-dom";
import icon from "@/assets/icon.png";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Link
      {...props}
      to="/"
      className={cls(
        props.className,
        "tw-inline-flex tw-items-center tw-gap-2 navbar-brand",
        "!tw-py-0"
      )}
    >
      <img src={icon} height="36" alt="" />
      <span className="tw-text-lg">OSS Web</span>
    </Link>
  );
};

export default Logo;
