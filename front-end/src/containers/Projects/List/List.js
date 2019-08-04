import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import axios from "../../../axiosInstance";
import { Redirect } from "react-router-dom";

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
    error: false,
    _isMounted: false
  };

  componentDidMount() {
    console.log(this.props);
    this._isMounted = true;
    axios({
      method: "GET",
      url: "/"
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

  componentWillUnmount() {
    console.log("unmount");
    this._isMounted = false;
  }

  render() {
    if (this.props.authorized) {
      let miniCardList;
      if (this.state.miniCards.length > 0) {
        miniCardList = this.state.miniCards.map(card => {
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
    } else {
      return <Redirect to="/splash" />;
    }
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
