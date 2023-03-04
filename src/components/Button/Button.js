import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className={`btn ${props.className}`}
        style={{ ...props.style }}
        type={props.type && props.type}
        onClick={props.onClick}
        disabled={props.disabled}
        onSubmit={props.onSubmit}
      >
        {props.children && props.children}
      </button>
    </>
  );
};

export default Button;
