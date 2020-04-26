import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axiosInstance";
import { Redirect, withRouter, Link } from "react-router-dom";

import Aux from "../../../hoc/Aux/Aux";
import styles from "./List.module.css";
import MiniCard from "../../../components/Cards/MiniCard/MiniCard";
import Loader from "../../../components/UI/Loader/Loader";
import * as actions from "../../../store/actions/index";

class List extends Component {
  state = {
    loading: true,
    miniCards: [],
    status: [
      { value: "1", displayValue: "Idea" },
      { value: "2", displayValue: "Research" },
      { value: "3", displayValue: "In-Progress" },
      { value: "4", displayValue: "Revision" },
      { value: "5", displayValue: "Finished" },
      { value: "6", displayValue: "Submitted" },
      { value: "7", displayValue: "Accepted" },
    ],
    error: false,
    filter: null,
    _isMounted: false,
  };

  componentDidMount() {
    // console.log("PROPS: ", this.props);
    // console.log("init state: ", this.state);
    if (this.props.types.length < 1) {
      this.props.getProjectTypes();
    }

    //get projects from backend
    axios({
      method: "GET",
      url: "/",
    })
      .then((response) => {
        console.log("component did mount");
        this.setState({
          loading: false,
          miniCards: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
        console.log(error.message);
      });
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("component did update");
    // console.log("in update", prevState, this.state, prevProps, this.props);
    if (
      (this.props.match.params.status && this.state.filter === null) ||
      (this.props.match.params.status &&
        this.props.match.params.status !== prevProps.match.params.status)
    ) {
      this.setState({
        filter: this.props.match.params.status,
      });
    }
    if (
      (this.props.match.params.typeid && this.state.filter === null) ||
      (this.props.match.params.typeid &&
        this.props.match.params.typeid !== prevProps.match.params.typeid)
    )
      this.setState({
        filter: this.props.match.params.typeid,
      });
    if (this.props.match.path === "/" && this.state.filter !== null) {
      console.log("no filter!");
      this.setState({ filter: null, archive: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let miniCardList;
    if (this.state.loading) {
      miniCardList = <Loader />;
    }
    if (this.state.miniCards.length > 0) {
      miniCardList = this.state.miniCards.map((card) => {
        if (
          this.state.filter !== null &&
          this.state.filter !== card.status.statusname &&
          this.state.filter !== card.type.typename
        ) {
          return null;
          // what does that above return null do? how/where would i render a little setence
          // saying 'no projects in this type/at this status' if there aren't any?
        }
        return (
          <MiniCard
            key={card.id}
            title={card.name}
            type={card.type.typename}
            color={card.status.color}
            status={card.status.statusname}
            view={card.id}
          />
        );
      });
    } else {
      return (
        <h2 className={styles.pageTitle}>You don't have any projects yet!</h2>
      );
    }
    return (
      <Aux>
        <h1 className={styles.pageTitle}>Your Projects</h1>
        <div className={styles.MiniCardContainer}>{miniCardList}</div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    types: state.type.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes()),
  };
};

const ListWithRouter = withRouter(List);

export default connect(mapStateToProps, mapDispatchToProps)(ListWithRouter);
