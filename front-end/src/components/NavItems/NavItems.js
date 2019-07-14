import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import DropDown from "../../components/UI/Dropdown/DropDown";

const navItems = props => (
  // alone, link to does nothing, must figure out how to re-render list component with updated data from backend
  // this will have to change hugely anyway, but also don't forget to WRAP the items in the link to, not vice versa
  <nav>
    {props.isAuth ? (
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
        <DropDown
          selectClass="byStatus"
          defaultVal="Idea"
          defaultDisplayVal="View by Status"
          vals={props.statuses}
        />

        <DropDown
          selectClass="byType"
          defaultVal={props.types[0]}
          defaultDisplayVal="View by Type"
          vals={props.types}
        />
        <NavItem id="ViewAccount">
          <Link to="/account">Me</Link>
        </NavItem>
        <NavItem id="SignOut">
          <Link to="/signout">Sign Out</Link>
        </NavItem>
      </ul>
    ) : (
      <ul className={styles.NavItems}>
        <NavItem id="AddNew">
          <Link to="/signin">Sign In</Link>
        </NavItem>
        <NavItem id="ViewAll">
          <Link to="/signup">SignUp</Link>
        </NavItem>
      </ul>
    )}
  </nav>
);

export default navItems;
