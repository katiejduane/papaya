import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import './Layout.css';
import Header from '../../components/UI/Header/Header';
import MainNav from '../../containers/Navigation/MainNav/MainNav';

class Layout extends Component {
    state = {
        showSideNav: false
    }

    render() {
        return(
            <Aux>
                <Header />
                <MainNav />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;

