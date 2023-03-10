import React from "react";
import cls from "classnames";
import { useControllableValue } from "ahooks";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked?: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props, ref) => {
    const [checked = false, setChecked] = useControllableValue<boolean>(props, {
      valuePropName: "checked",
      trigger: "onChange",
    });

    return (
      <label
        ref={ref}
        style={props.style}
        className={cls(props.className, "form-check")}
      >
        <input
          className="form-check-input"
          type="checkbox"
          checked={checked}
          disabled={props.disabled}
          onChange={() => setChecked(!checked)}
        />
        <span className="form-check-label">{props.children}</span>
      </label>
    );
  }
);

export default Checkbox;
