import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";

import styles from "./MainNav.module.css";
import NavItems from "../../components/NavItems/NavItems";
import * as actions from "../../store/actions/index";

class MainNav extends Component {
  state = {
    username: "",
    types: [],
    stats: [
      { value: "0", displayValue: "Filter by Status" },
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
    //this is a shitty temp solution
  }

  filterList() {}

  clearFilter() {}

  render() {
    // need to push on a starter value; probably create a reusable component for this elswhere? (to also use in add/edit)
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
          <div className={styles.Welcome}>Hi, Katie</div>
          <nav className={styles.deskTopOnly}>
            <select className={"byStatus"}>{statsArray}</select>
            <select className={"byType"}>{typesArray}</select>
            <NavItems />
          </nav>
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
    types: state.type.types
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);
