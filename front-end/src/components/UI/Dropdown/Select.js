import React from "react";

const select = props => {
  return (
    <select onChange={props.change} className="{props.selectClass}">
      {props.defaultDisplayVal}
      {props.vals}
    </select>
  );
};

export default select;
