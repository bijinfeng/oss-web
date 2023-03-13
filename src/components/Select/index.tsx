import React, { useRef } from "react";
import { useMount } from "ahooks";
import TomSelect from "tom-select";
import type { TomSettings } from "tom-select/dist/types/types";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value?: string | number;
  onChange?: (value?: string | number) => void;
  options?: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props) => {
  const { options = [], placeholder, value, onChange } = props;
  const rendered = useRef(false);
  const ref = useRef<HTMLSelectElement>(null);

  useMount(() => {
    if (!rendered.current && ref.current) {
      rendered.current = true;
      new TomSelect(ref.current, {
        copyClassesToDropdown: false,
        dropdownClass: "dropdown-menu ts-dropdown",
        optionClass: "dropdown-item",
        controlInput: "<input>",
        render: {
          item: function (data, escape) {
            if (data.customProperties) {
              return (
                '<div><span class="dropdown-item-indicator">' +
                data.customProperties +
                "</span>" +
                escape(data.text) +
                "</div>"
              );
            }
            return "<div>" + escape(data.text) + "</div>";
          },
          option: function (data, escape) {
            if (data.customProperties) {
              return (
                '<div><span class="dropdown-item-indicator">' +
                data.customProperties +
                "</span>" +
                escape(data.text) +
                "</div>"
              );
            }
            return "<div>" + escape(data.text) + "</div>";
          },
        } as TomSettings["render"],
        onChange,
      });
    }
  });

  return (
    <select
      ref={ref}
      className="form-select"
      placeholder={placeholder}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default React.memo(Select);
