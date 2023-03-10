import React from "react";

const Select: React.FC = () => {
  return (
    <div className="ts-wrapper form-select single full has-items input-hidden">
      <div className="ts-control">
        <div data-value="1" className="item" data-ts-item="">
          Chuck Tesla
        </div>
        <input
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-controls="select-users-ts-dropdown"
          id="select-users-ts-control"
          placeholder="Select a date"
          type="select-one"
          aria-activedescendant="select-users-opt-1"
        />
      </div>
      <div className="dropdown-menu ts-dropdown single">
        <div
          role="listbox"
          tabIndex={-1}
          className="ts-dropdown-content"
          id="select-users-ts-dropdown"
        >
          <div
            data-selectable=""
            data-value="1"
            className="dropdown-item selected active"
            role="option"
            id="select-users-opt-1"
            aria-selected="true"
          >
            Chuck Tesla
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
