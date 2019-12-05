import React from "react";
import { Link } from "react-router-dom";

import "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import DropDown from "../UI/Dropdown/DropDown";

const navItems = props => (
  <nav>
    {props.isAuth ? (
      <ul className="NavItems">
        <NavItem id="AddNew">
          <Link to="/addNew">Add New</Link>
        </NavItem>
        <NavItem id="ViewAll">
          <Link to="/">Current</Link>
        </NavItem>
        <DropDown
          selectClass="byStatus"
          defaultVal="Idea"
          defaultDisplayVal="View by Status"
          vals={props.stats}
          change={props.changeStatus}
        />
        <DropDown
          selectClass="byType"
          defaultVal={props.types[0]}
          defaultDisplayVal="View by Type"
          vals={props.types}
          change={props.changeType}
        />
        <NavItem id="ViewArchive">
          <Link to="/archive">Archive</Link>
        </NavItem>
        <NavItem id="ViewAccount">
          <Link to="/account">Me</Link>
        </NavItem>
        <NavItem clicked={props.signOut} id="SignOut">
          Sign Out
        </NavItem>
      </ul>
    ) : (
      <ul className="NavItems">
        <NavItem id="SignInNav">
          <Link to="/signin">Sign In</Link>
        </NavItem>
        <NavItem id="SignOutNav">
          <Link to="/signup">SignUp</Link>
        </NavItem>
      </ul>
    )}
  </nav>
);

export default navItems;
