import React, { PropsWithChildren } from "react";
import cls from "classnames";
import { isUndefined } from "lodash-es";
import { useController, useFormContext } from "react-hook-form";

import type { FormItemProps } from "./type";

const FormItem: React.FC<PropsWithChildren<FormItemProps>> = (props) => {
  const {
    name,
    children,
    defaultValue,
    rules,
    shouldUnregister,
    required,
    label,
    style,
    className,
    labelSuffix,
    noStyle,
  } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const isRequired = !isUndefined(required)
    ? required
    : rules && !!rules?.required;

  const errorMessage = fieldState.error?.message;

  const renderChildren = () => {
    if (!React.isValidElement(children)) return children;

    const { onChange, onBlur, value, ref } = field;
    return React.cloneElement(children, {
      ...children.props,
      error: !!errorMessage,
      onChange,
      onBlur,
      value,
      ref,
    });
  };

  if (noStyle) return <div>{renderChildren()}</div>;

  return (
    <div className={cls(className, "mb-3")} style={style}>
      <label className={cls("form-label", { required: isRequired })}>
        {label}
        {labelSuffix && (
          <span className="form-label-description">{labelSuffix}</span>
        )}
      </label>
      {renderChildren()}
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default FormItem;
