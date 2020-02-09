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
        <NavItem id="ViewAll" click={props.clearFilters}>
          <Link to="/">View All Projects</Link>
        </NavItem>
        <NavItem click={props.showDropDown}>View by Status</NavItem>
        <DropDown
          visible={false}
          selectClass="byStatus"
          vals={props.stats}
          click={props.changeStatus}
        />
        <NavItem click={props.showDropDown}>View by Type</NavItem>
        <DropDown
          selectClass="byType"
          visible={false}
          vals={props.types}
          click={props.changeType}
        />
        {/* <NavItem id="ViewArchive" click={props.getArchive}>
          <Link to="/archive">Archive</Link>
        </NavItem> */}
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
