import React from 'react';
// import { NavLink } from 'react-router-dom';
import './NavItem.css';

const navItem = (props) => (
    <li className="NavItem" id={props.id}>
        {props.children}
    </li>
)

export default navItem;
