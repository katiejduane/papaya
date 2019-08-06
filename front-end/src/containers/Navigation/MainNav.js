import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";

import styles from "./MainNav.module.css";
import NavItems from "../../components/NavItems/NavItems";
import * as actions from "../../store/actions/index";

class MainNav extends Component {
  state = {
    stats: [
      { value: "1", displayValue: "Idea" },
      { value: "2", displayValue: "Research" },
      { value: "3", displayValue: "In-Progress" },
      { value: "4", displayValue: "Revision" },
      { value: "5", displayValue: "Finished" },
      { value: "6", displayValue: "Submitted" },
      { value: "7", displayValue: "Accepted" }
    ]
  };

  componentDidMount() {
    this.props.getProjectTypes();
    // i can't tell if this is bad or not; i have seen it done in some tutorials, but
    // i get weird errors about memory leaks (from this page i think) when i clear local storage
    // to 'log out'; rendering this function totally null
  }

  typeChangeHandler() {}

  statusChangeHandler() {}

  render() {
    let typesArray = this.props.types.map(type => {
      return (
        <option key={type.id} value={type.id}>
          {type.typename}
        </option>
      );
    });

    let statsArray = this.state.stats.map(status => {
      return (
        <option key={status.value} value={status.value}>
          {status.displayValue}
        </option>
      );
    });

    return (
      <header className={styles.MainNav}>
        <section className={styles.NavTop}>
          <div className={styles.Welcome}>Hi, {this.props.name}</div>
          <div className={styles.deskTopOnly}>
            <NavItems
              isAuth={this.props.isAuth}
              statuses={statsArray}
              types={typesArray}
            />
          </div>
        </section>
        <section className={styles.NavBottom}>
          <div className={styles.MainNavLogo} />
        </section>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    name: state.auth.firstname,
    types: state.type.types,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes()),
    signOut: () => dispatch(actions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);
