import React from 'react';
import './MainNav.css';
import NavItems from '../../components/NavItems/NavItems';



class MainNav extends Compondent {
    // state = {
    //     username: '',
    //     types: [],
    //     statuses:
    // }

    componentDidMount(){

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