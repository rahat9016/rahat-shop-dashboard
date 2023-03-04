import React from "react";
import "./style.css";
const Select = (props) => {
  return (
    <select
      name={props.name && props.name}
      onChange={props.onChange}
      className={`select ${props.className ? props.className : ""}`}
      value={props.value && props.value}
      style={{ ...props.style }}
      required={props.required && props.required}
    >
      <option value={""}>{props.optionValue && props.optionValue}</option>
      {props.categories.map((category, index) => {
        return (
          <option key={index} value={category.id}>
            {category.title || props?.title}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
