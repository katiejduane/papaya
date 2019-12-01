import React from "react";

// if this <select> isn't in a form, is it still semantic/valid HTML? like if i use the query string
// for filtering, instead of a form/select/submit for sending reqs to the database, should the select
// instead be a <ul> that mimics the behavior of a <select> or something??  idk...

// á la...
/* <ul onChange={props.change} className="{props.selectClass}">
  {props.defaultDisplayVal}
</ul>; */

{
  /* <select onChange={props.change} className={props.selectClass}>
  <option value={props.defaultVal}>{props.defaultDisplayVal}</option>
  {props.vals}
</select> */
}

const dropdown = props => {
  return (
    <ul onChange={props.change} className="{props.selectClass}">
      {props.defaultDisplayVal}
      {props.vals}
    </ul>
  );
};

export default dropdown;
