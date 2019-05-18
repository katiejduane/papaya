import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import './Layout.css';
import MainNav from '../../containers/Navigation/MainNav';

class Layout extends Component {
    state = {
        showMobileNav: false
    }

    render() {
        return(
            <Aux>
                <MainNav />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;

