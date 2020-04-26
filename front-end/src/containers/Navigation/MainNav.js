import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
      { value: "7", displayValue: "Accepted" },
    ],
    statusFilter: null,
    typeFilter: null,
    archive: false,
    showDropDown: null,
  };

  componentDidMount() {
    this.props.getProjectTypes();
  }

  componentDidUpdate() {
    // needed because if a user adds another type, this component needs to re-render with updated
    // types list from BE!
  }

  typeChangeHandler = (event) => {
    this.setState({
      typeFilter: event.target.value,
    });
  };

  statusChangeHandler = (event) => {
    this.setState({
      statusFilter: event.target.value,
    });
  };

  // getArchive = () => {
  // this.setState({
  //   archive: true,
  //   statusFilter: null,
  //   typeFilter: null
  // });
  // };

  showTypes = (event) => {
    console.log("click dropdown", event.target.id);
    this.setState({
      showStatuses: true,
    });
  };

  showStatuses = (event) => {
    console.log("click dropdown", event.target.id);
    this.setState({
      showTypes: true,
    });
  };

  render() {
    let typesArray = this.props.types.map((type) => {
      return (
        <li key={type.id} value={type.id}>
          <Link to={`/type/${type.typename}`}>{type.typename}</Link>
        </li>
      );
    });

    let statsArray = this.state.stats.map((status) => {
      return (
        <li key={status.value} value={status.value} label={status.displayValue}>
          <Link to={`/status/${status.displayValue}`}>
            {status.displayValue}
          </Link>
        </li>
      );
    });

    return (
      <header className={styles.MainNav}>
        <section className={styles.NavTop}>
          <div className={styles.Welcome}>Hi, {this.props.name}</div>
          <div className={styles.deskTopOnly}>
            <NavItems
              // showStatuses={this.showStatuses}
              // showTypes={this.showTypes}
              isAuth={this.props.isAuth}
              stats={statsArray}
              types={typesArray}
              signOut={this.props.signOut}
              changeType={this.typeChangeHandler}
              changeStatus={this.statusChangeHandler}
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    name: state.auth.firstname,
    types: state.type.types,
    isAuth: state.auth.token !== null, // this is bad, i need to check something else because a malformed token IS NOT NULL
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes()),
    signOut: () => dispatch(actions.signOut()),
    clearTypes: () => dispatch(actions.clearProjectTypes()),
  };
};

const MainNavWithRouter = withRouter(MainNav);

export default connect(mapStateToProps, mapDispatchToProps)(MainNavWithRouter);
