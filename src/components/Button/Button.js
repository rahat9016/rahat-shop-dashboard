import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className={`btn`}
        style={{ ...props.style }}
        type={props.type && props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children && props.children}
      </button>
    </>
  );
};

export default Button;
