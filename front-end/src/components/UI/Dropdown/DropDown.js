import React from "react";

const dropdown = props => {
  return (
    <ul
      onChange={props.change}
      onClick={props.click}
      className={props.selectClass}
      isvisible={props.visible}
    >
      {props.vals}
    </ul>
  );
};

export default dropdown;
