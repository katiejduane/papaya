import React from "react";

const select = props => {
  return (
    <select onChange={props.change} className="{props.selectClass}">
      <option defaultValue={props.defaultVal} value={props.defaultVal}>
        {props.defaultDisplayVal}
      </option>
      {props.vals}
    </select>
  );
};

export default select;
