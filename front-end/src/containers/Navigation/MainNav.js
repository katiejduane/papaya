import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import styles from "./MainNav.module.css";
import NavItems from "../../components/NavItems/NavItems";

class MainNav extends Component {
  state = {
    username: "",
    types: [],
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
    // get types
    axios({
      method: "GET",
      url: `/users/getNav`
    })
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          username: response.data.user.firstname
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        console.log(error);
      });
  }

  filterList() {}

  clearFilter() {}

  render() {
    return (
      <header className={styles.MainNav}>
        <section className={styles.NavTop}>
          <div className={styles.Welcome}>Hi, Katie</div>
          <nav className={styles.deskTopOnly}>
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
    types: state.types
  };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         checkToken: () => dispatch(actions.checkToken())
//     };
// };

export default connect(
  mapStateToProps,
  null
)(MainNav);
