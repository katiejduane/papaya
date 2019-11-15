import React from "react";

// const dropdown = props => {
//   return (
//     <select className={props.selectClass}>
//       <option onChange={props.change} className="{props.selectClass}">
//         {props.defaoptiontDisplayVal}
//         {props.vals}
//       </option>
//     </select>
//   );
// };

const dropdown = props => {
  return (
    <select onChange={props.change} className={props.selectClass}>
      <option value={props.defaultVal}>{props.defaultDisplayVal}</option>
      {props.vals}
    </select>
  );
};

export default dropdown;
