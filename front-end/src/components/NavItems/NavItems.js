import React from "react";
import { Link } from "react-router-dom";

import "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  // alone, link to does nothing, must figure out how to re-render list component with updated data from backend
  // this will have to change hugely anyway, but also don't forget to WRAP the items in the link to, not vice versa
  <nav>
    {props.isAuth ? (
      <ul className="NavItems">
        <NavItem id="AddNew">
          <Link to="/addNew">Add New</Link>
        </NavItem>
        <NavItem id="ViewAll">
          <Link to="/">Current</Link>
        </NavItem>
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
