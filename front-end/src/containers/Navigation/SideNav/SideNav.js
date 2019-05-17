import React from 'react';

// import Logo from '../../../../public/';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import './SideNav.css';

const sideDrawer = (props) => {
    // conditionally attach CSS classes
    let attachedClasses = ["SideNave", "Close"];
    if (props.open) {
        attachedClasses = ["SideNave", "Open"]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <div className="SideNavLogo">
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );

}

export default sideNav;