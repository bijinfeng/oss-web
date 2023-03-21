import React, { PropsWithChildren, useMemo } from "react";
import cls from "classnames";
import { isNil, isUndefined } from "lodash-es";
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

  // required 为 true，且 rules 为空时赋予 rules 默认值
  const lastRules = useMemo<FormItemProps["rules"]>(() => {
    return !!required && isNil(rules) ? { required: `请填写${label}` } : rules;
  }, [required, rules, label]);

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
    rules: lastRules,
    shouldUnregister,
  });

  const isRequired = !isUndefined(required)
    ? required
    : rules && !!rules?.required;

  const errorMessage = fieldState.error?.message;

  const renderChildren = () => {
    if (!React.isValidElement(children)) return children;

    // 判断是不是原生组件
    const isNative = typeof children.type === "string";
    const error = !!errorMessage;
    const restProps = error
      ? { error: isNative ? error.toString() : error }
      : null;

    return React.cloneElement(children, {
      ...restProps,
      ...children.props,
      ...field,
    });
  };

  if (noStyle) return <div>{renderChildren()}</div>;

  return (
    <div className={cls("mb-3", className)} style={style}>
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
