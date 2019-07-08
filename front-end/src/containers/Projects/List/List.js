import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import axios from "../../../axiosInstance";
// import { Redirect } from "react-router-dom";

import styles from "./List.module.css";
import MiniCard from "../../../components/Cards/MiniCard/MiniCard";
import * as actions from "../../../store/actions/index";

class List extends Component {
  state = {
    loading: true,
    miniCards: [],
    status: [
      "Idea",
      "Research",
      "In-Progress",
      "Revision",
      "Finished",
      "Accepted"
    ],
    types: [],
    error: false
  };

  componentDidMount() {
    // const headers = {
    //   "Content-type": "application/json"
    // };
    // const token = localStorage.getItem("token");
    // if (token) {
    //   headers["Authorization"] = token;
    // }
    axios({
      method: "GET",
      url: `/`
      // token: token,
      // headers
    })
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          miniCards: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        console.log(error);
      });
  }

  render() {
    let miniCardList;
    if (this.state.miniCards.length > 0) {
      miniCardList = this.state.miniCards.map(card => {
        // change using key{i} this is bad
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
      return <h2>You don't have any projects yet!</h2>;
    }

    return <div className={styles.MiniCardContainer}>{miniCardList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkToken: () => dispatch(actions.checkToken())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
