import React from "react";

const dropdown = props => {
  return (
    <ul onChange={props.change} className="{props.selectClass}">
      {props.defaultDisplayVal}
      {props.vals}
    </ul>
  );
};

export default dropdown;
