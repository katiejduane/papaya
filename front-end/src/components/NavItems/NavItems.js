import React from 'react';

import './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className="NavItems">
    <NavItem>All</NavItem>
    <NavItem>Type</NavItem>
    <NavItem>Category</NavItem>
    <NavItem>Status</NavItem>
    <NavItem>Acct</NavItem>
  </ul>
);

export default navItems;
