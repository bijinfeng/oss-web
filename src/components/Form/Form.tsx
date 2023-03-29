import { useImperativeHandle, useEffect } from "react";
import { useForm, FieldValues, FormProvider } from "react-hook-form";
import { useMemoizedFn } from "ahooks";
import { noop } from "lodash-es";

import { FormContext } from "./FormContext";
import type { FormProps } from "./type";

const Form = <V extends FieldValues>(props: FormProps<V>) => {
  const {
    children,
    showValidateMessage = true,
    layout,
    colon,
    style,
    form,
    mode = "onChange",
    onChange = noop,
    ...formProps
  } = props;
  const memoizeChange = useMemoizedFn(onChange);
  const methods = useForm<V>({ mode, ...formProps });
  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      memoizeChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, memoizeChange]);

  useImperativeHandle(form, () => methods);

  return (
    <FormProvider<V> {...methods}>
      <FormContext.Provider value={{ showValidateMessage, layout, colon }}>
        <div style={style}>{children}</div>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default Form;
