import React from "react";

const Input = ({ type, value, onChange, onFocus, onBlur, name }) => {
  const labelStyle = {
    position: "absolute",
    top: "25%",
    left: "1rem",
    fontSize: "16px",
    color: "#afb4c0",
    pointerEvents: "none",
    transition: "all 0.5s ease-in-out",
  };
  return (
    <div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label htmlFor={name}></label>
    </div>
  );
};

export default Input;
