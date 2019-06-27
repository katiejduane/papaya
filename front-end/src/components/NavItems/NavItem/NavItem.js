import React from 'react';
// import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const navItem = (props) => (
    <li className={styles.NavItem} id={props.id}>
        {props.children}
    </li>
)

export default navItem;
