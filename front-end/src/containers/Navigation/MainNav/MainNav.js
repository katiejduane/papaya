import React from 'react';
import './MainNav.css';
import NavItems from '../../../components/NavItems/NavItems';


const MainNav = (props) => (
    <header className="MainNav">
        <div className="MainNavLogo"></div>
        <nav className="deskTopOnly">
           <NavItems />
        </nav>
    </header>
)

export default MainNav;