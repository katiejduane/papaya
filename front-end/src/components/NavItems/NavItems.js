import React from 'react';
import { Link } from 'react-router-dom';

import './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  // alone, link to does nothing, must figure out how to re-render list component with updated data from backend
  // this will have to change hugely anyway, but also don't forget to WRAP the items in the link to, not vice versa
  <ul className="NavItems">
    <NavItem id="AddNew"><Link to='/addNew'>Add New</Link></NavItem>
    <NavItem id="ViewAll"><Link to='/'>All</Link></NavItem>
    <NavItem id="ViewByType"><Link to='view/:type'>By Type</Link></NavItem>
    <NavItem id="ViewByStatus"><Link to='view/:status'>By Status</Link></NavItem>
    <NavItem id="ViewArchive"><Link to='/archive'>Archive</Link></NavItem>
    <NavItem id="ViewAccount"><Link to='/account'>Me</Link></NavItem>
  </ul>
);

export default navItems;

