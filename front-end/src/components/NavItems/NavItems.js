import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import DropDOwn from "../../components/UI/Dropdown/DropDown";

// do i want to render these here...?
{
  /* <DropDown
  selectClass="byStatus"
  defaultVal="Idea"
  defaultDisplayVal="View by Status"
  vals={props.statsArray}
/> */
}
{
  /* <DropDown
  selectClass="byType"
  defaultVal={props.typesArray[0]}
  defaultDisplayVal="View by Type"
  vals={props.typesArray}
/> */
}

const navItems = props => (
  // alone, link to does nothing, must figure out how to re-render list component with updated data from backend
  // this will have to change hugely anyway, but also don't forget to WRAP the items in the link to, not vice versa
  <ul className={styles.NavItems}>
    <NavItem id="AddNew">
      <Link to="/addNew">Add New</Link>
    </NavItem>
    <NavItem id="ViewAll">
      <Link to="/">All</Link>
    </NavItem>
    <NavItem id="ViewArchive">
      <Link to="/archive">Archive</Link>
    </NavItem>
    <NavItem id="ViewAccount">
      <Link to="/account">Me</Link>
    </NavItem>
  </ul>
);

export default navItems;
