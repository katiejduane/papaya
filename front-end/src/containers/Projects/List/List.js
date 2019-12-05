import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axiosInstance";
import { Redirect, withRouter, Link } from "react-router-dom";

import Aux from "../../../hoc/Aux/Aux";
import styles from "./List.module.css";
import MiniCard from "../../../components/Cards/MiniCard/MiniCard";
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
      { value: "7", displayValue: "Accepted" }
    ],
    error: false,
    filter: null,
    isArchive: false,
    _isMounted: false
  };

  componentDidMount() {
    if (this.props.types.length < 1) {
      console.log("requesting types", this.props);
      this.props.getProjectTypes();
    }

    //get projects from backend
    if (this.state.isArchive === false) {
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
          console.log(error.message);
        });
      this._isMounted = true;
    } else {
      axios({
        method: "GET",
        url: "/archive"
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
          console.log(error.message);
        });
      this._isMounted = true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("component did update evaluating props", prevProps, this.props);
    // console.log("component did update evaluating state", prevState, this.state);
    if (
      this.props.match.params &&
      this.props.match.params.status &&
      this.props.match.params.status !== prevProps.match.params.status
    ) {
      this.setState({
        filter: this.props.match.params.status
      });
    }
    if (
      this.props.match.params &&
      this.props.match.params.typeid &&
      this.props.match.params.typeid !== prevProps.match.params.typeid
    )
      this.setState({
        filter: this.props.match.params.typeid
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clearFilter() {
    //this will be linked to a button somewhere in List and onclick, makes this.state.filter = null
  }

  viewArchive = () => {
    //could it be as simple as having some kind of state monitor whether archive is set to true or false???
    //yes, but the 'archive' button may need to be moved to inside this component? or passed in via props/
    //query string! :)
  };

  render() {
    console.log("stars", this.state.filter);
    if (this.props.authorized) {
      let miniCardList;
      if (this.state.miniCards.length > 0) {
        miniCardList = this.state.miniCards.map(card => {
          console.log("hiiiiiiiii", this.state.filter);
          if (
            this.state.filter !== null &&
            this.state.filter !== card.status.statusname &&
            this.state.filter !== card.type.typename
          ) {
            return null;
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
        return <h2>You don't have any projects yet!</h2>;
      }
      return (
        <Aux>
          <h1>Your Projects</h1>
          <div className={styles.MiniCardContainer}>{miniCardList}</div>
        </Aux>
      );
    } else {
      return <Redirect to="/splash" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    types: state.type.types
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes())
  };
};

const ListWithRouter = withRouter(List);

export default connect(mapStateToProps, mapDispatchToProps)(ListWithRouter);
