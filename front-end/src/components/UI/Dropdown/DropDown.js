import React from "react";

const dropdown = (props) => {
  console.log("dd", props);
  return (
    <ul
      onChange={props.change}
      onClick={props.click}
      className={props.selectClass}
      // show={props.show}
    >
      {props.vals}
    </ul>
  );
};

export default dropdown;
