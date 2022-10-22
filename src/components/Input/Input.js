import React from "react";
import "./style.css";
const Input = (props) => {
  return (
    <input
      id={props.id}
      name={props.name && props.name}
      className={`input ${props.class ? props.class : ""}`}
      style={{ ...props.style }}
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input;
