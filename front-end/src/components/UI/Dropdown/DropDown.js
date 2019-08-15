import React from "react";
import { Link } from "react-router-dom";

const dropdown = props => {
  return (
    <select onChange={props.change} className={props.selectClass}>
      <option value={props.defaultVal}>{props.defaultDisplayVal}</option>
      {props.vals}
    </select>
  );
};

export default dropdown;
