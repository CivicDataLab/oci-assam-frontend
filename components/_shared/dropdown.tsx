import React from 'react';

const Dropdown = (props) => (
  <>
    <label className="label-green" htmlFor="custom_select">
      {props.heading}
    </label>
    <select
      id="custom_select"
      className="select-comp"
      onChange={props.handleDropdownChange}
      value={props.default ? props.default : props.options[0]}
    >
      {props.options.map((option: any, index: any) => (
        <option key={`dropdown-${index}`}>{option}</option>
      ))}
    </select>
  </>
);

export default Dropdown;
