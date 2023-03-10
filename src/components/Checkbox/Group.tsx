import React from "react";
import { useControllableValue } from "ahooks";

import Checkbox from "./Checkbox";

interface GroupProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  options?: { label: string; value: string }[];
}

const Group: React.FC<GroupProps> = ({ options, ...rest }) => {
  const [value = [], setValue] = useControllableValue<string[]>(rest);

  const handleChange = (name: string) => {
    if (value.includes(name)) {
      setValue(value.filter((it) => it !== name));
    } else {
      setValue([...value, name]);
    }
  };

  return (
    <div>
      {options?.map((item) => (
        <Checkbox
          key={item.value}
          checked={value.includes(item.value)}
          onChange={() => handleChange(item.value)}
        >
          {item.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default Group;
