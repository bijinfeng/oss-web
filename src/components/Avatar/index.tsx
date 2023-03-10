import React, { useMemo } from "react";
import cls from "classnames";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";

import type { Color } from "@/interface/enums";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  url?: string;
  color?: Color;
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  shape?: "circle" | "round";
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { color, name, size, url, shape, className, children, ...rest } = props;

  const avatarUrl = useMemo(() => {
    if (url) return url;
    if (name) {
      const avatar = createAvatar(identicon, {
        seed: name,
      });
      return avatar.toDataUriSync();
    }
    return "";
  }, [url, name]);

  return (
    <span
      {...rest}
      className={cls(
        "avatar",
        "tw-overflow-hidden",
        {
          [`avatar-${color}-lt`]: color,
          [`avatar-${size}`]: size,
          rounded: shape === "round",
          "rounded-circle": shape === "circle",
        },
        className
      )}
    >
      {avatarUrl ? <img src={avatarUrl} /> : children}
    </span>
  );
};

export default Avatar;
