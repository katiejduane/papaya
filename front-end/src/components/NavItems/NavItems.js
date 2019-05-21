import React from 'react';
import { Link } from 'react-router-dom';

import './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className="NavItems">
    <NavItem id="AddNew"><Link to='/addNew'>Add New</Link></NavItem>
    <NavItem>All</NavItem>
    <NavItem>By Type</NavItem>
    <NavItem>By Status</NavItem>
    <NavItem>Me</NavItem>
  </ul>
);

export default navItems;

