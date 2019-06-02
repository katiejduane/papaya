import React, { Component } from 'react';
import './MainNav.css';
import NavItems from '../../components/NavItems/NavItems';


class MainNav extends Component {
    state = {
        username: '',
        types: [],
        // stats: [
        //     { value: '1', displayValue: 'Idea' },
        //     { value: '2', displayValue: 'Research' },
        //     { value: '3', displayValue: 'In-Progress' },
        //     { value: '4', displayValue: 'Revision' },
        //     { value: '5', displayValue: 'Finished' },
        //     { value: '6', displayValue: 'Submitted' },
        //     { value: '7', displayValue: 'Accepted' }
        // ]
    }

    componentDidMount(){
       // get types
    }


    filterList() {

    }

    clearFilter() {

    }

    render(){
        return (
            <header className="MainNav">
                <section className="NavTop">
                    <div className="Welcome">Hi, Katie</div>
                    <nav className="deskTopOnly">
                        <NavItems />
                    </nav>
                </section>
                <section className="NavBottom">
                    <div className="MainNavLogo"></div>
                </section>

            </header>
        )

    }
} 
export default MainNav;