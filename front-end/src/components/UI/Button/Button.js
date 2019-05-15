import React from "react";
import "./Button.css";

const button = props => (
  <button
    disabled={props.disabled}
    className={props.btnClass}
    type={props.btnType}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default button;
