import type { ReactNode, RefObject, CSSProperties } from "react";
import type {
  UseFormProps,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

export type MemoInputProps = {
  value: unknown;
  update: number;
  children: React.ReactNode;
} & Record<string, unknown>;

export type FieldSharedProps = {
  required?: boolean;
  label?: ReactNode;
  labelSuffix?: ReactNode;
  style?: CSSProperties;
  className?: string;
  noStyle?: boolean;
};

export type FormLayout = "vertical" | "horizontal";
export type FormInstance<V extends FieldValues = FieldValues> =
  UseFormReturn<V>;

export interface FormProps<V extends FieldValues> extends UseFormProps<V> {
  /** 表单布局 */
  layout?: FormLayout;
  /** 是否显示 label 后面的冒号 */
  colon?: boolean;
  /** 是否显示验证信息 */
  showValidateMessage?: boolean;
  form?: RefObject<FormInstance<V>>;
  children?: ReactNode;
  style?: React.CSSProperties;
  onChange?: (value: V) => void;
}

export interface FormItemProps extends FieldSharedProps, UseControllerProps {
  noStyle?: boolean;
}
