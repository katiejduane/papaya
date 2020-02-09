import React from "react";

const dropdown = props => {
  return (
    <ul
      onChange={props.change}
      onClick={props.click}
      className={props.selectClass}
      isVisible={props.visible}
    >
      <div>{props.defaultDisplayVal}</div>
      {props.vals}
    </ul>
  );
};

export default dropdown;
