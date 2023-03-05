import React from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value?: string) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return <input value={value} onChange={handleChange} {...rest} />;
};

export default Input;
