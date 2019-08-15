import React from "react";

const dropdown = props => {
  return (
    <ul onChange={props.change} className={props.selectClass}>
      <li value={props.defaultVal}>{props.defaultDisplayVal}</li>
      {props.vals}
    </ul>
  );
};

export default dropdown;
