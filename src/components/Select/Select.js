import React from "react";
import "./style.css";
const Select = (props) => {
  return (
    <select
      name={props.name && props.name}
      onChange={props.onChange}
      className={`select ${props.class ? props.class : ""}`}
      value={props.value && props.value}
      style={{ ...props.style }}
      required={props.required && props.required}
    >
      <option value={""}>{props.optionValue && props.optionValue}</option>
      {props.categories.map((category) => {
        return (
          <option key={category.value} value={category.value}>
            {category.name || props?.title}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
