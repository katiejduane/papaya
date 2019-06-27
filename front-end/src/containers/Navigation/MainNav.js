import React, { Component } from 'react';
import styles from './MainNav.module.css';
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
            <header className={styles.MainNav}>
                <section className={styles.NavTop}>
                    <div className={styles.Welcome}>Hi, Katie</div>
                    <nav className={styles.deskTopOnly}>
                        <NavItems />
                    </nav>
                </section>
                <section className={styles.NavBottom}>
                    <div className={styles.MainNavLogo}></div>
                </section>

            </header>
        )

    }
} 
export default MainNav;