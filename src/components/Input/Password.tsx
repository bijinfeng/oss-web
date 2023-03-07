import React from "react";
import { omit } from "lodash-es";
import { useControllableValue } from "ahooks";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import Input, { InputProps } from "./Input";

interface PasswordProps extends InputProps {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  (props, ref) => {
    const restProps = omit(props, ["visible", "onVisibleChange"]);

    const [visible, setVisible] = useControllableValue(props, {
      defaultValuePropName: "visible",
      valuePropName: "visible",
      trigger: "onVisibleChange",
    });

    return (
      <Input
        {...restProps}
        ref={ref}
        type={visible ? "text" : "password"}
        addonAfter={
          <a
            href="#"
            className="link-secondary"
            title={`${visible ? "Hide" : "Show"} password`}
            data-bs-toggle="tooltip"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <IconEyeOff className="icon" />
            ) : (
              <IconEye className="icon" />
            )}
          </a>
        }
      />
    );
  }
);

export default Password;
