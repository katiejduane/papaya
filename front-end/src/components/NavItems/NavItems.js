import React from 'react';

import './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className="NavItems">
    <NavItem id="AddNew" link="/addNew" >Add New</NavItem>
    <NavItem>All</NavItem>
    <NavItem>By Type</NavItem>
    <NavItem>By Status</NavItem>
    <NavItem>Me</NavItem>
  </ul>
);

export default navItems;
