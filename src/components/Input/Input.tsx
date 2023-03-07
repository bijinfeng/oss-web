import React, { ReactNode } from "react";
import cls from "classnames";

type OriginInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix"
>;

export interface InputProps extends OriginInputProps {
  value?: string;
  onChange?: (value?: string) => void;
  error?: boolean;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  allowClear?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  readonly?: boolean;
  flat?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    onChange,
    error,
    className,
    addonAfter,
    addonBefore,
    prefix,
    suffix,
    flat,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const renderInput = (widthParent: boolean) => (
    <input
      ref={ref}
      value={value}
      onChange={handleChange}
      className={cls("form-control", {
        "is-invalid": !widthParent && error,
      })}
      {...rest}
    />
  );

  if (addonBefore || addonAfter) {
    return (
      <div
        className={cls(className, "input-group", {
          "input-group-flat": flat,
          "is-invalid": error,
        })}
      >
        {addonBefore && <span className="input-group-text">{addonBefore}</span>}
        {renderInput(true)}
        {addonAfter && <span className="input-group-text">{addonAfter}</span>}
      </div>
    );
  }

  if (prefix || suffix) {
    return (
      <div className={cls(className, "input-icon", { "is-invalid": error })}>
        {prefix && <span className="input-icon-addon">{prefix}</span>}
        {renderInput(true)}
        {suffix && <span className="input-icon-addon">{suffix}</span>}
      </div>
    );
  }

  return renderInput(false);
});

export default Input;
