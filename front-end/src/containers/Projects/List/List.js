import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axiosInstance";
import { Redirect, withRouter } from "react-router-dom";

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
    filter: "/",
    _isMounted: false
  };

  componentDidMount() {
    if (this.props.types.length < 1) {
      console.log("requesting types");
      this.props.getProjectTypes();
    }

    //get projects from backend
    axios({
      method: "GET",
      url: "/"
      //can the url be executed programmatically, like to include 'current' or 'archive'? can i parse the query string here?
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

  componentDidUpdate(prevProps, prevState) {
    console.log("get query params here to update state? read more on this...");
    // mayybe i'll have to use some combination of router and render props?
    console.log("component did update evaluating props", prevProps, this.props);
    console.log("component did update evaluating state", prevState, this.state);

    // this seems insanely obscure so i think i'm just going to use the dropdowns in the main nav
    // to make requests to the backend which will make this component update with new array of projects
    // based on chosen filter... abandon the efforts to get it from the url/router i think...

    // i think i'll have to pass some state from the nav to this component so that it re-renders when
    // the user changes the filter using the dropdown on the nav, or clicks 'archive'. no sense in having
    // the archive render another component

    if (prevProps.match.url !== this.props.match.url) {
      this.setState({
        filter: this.props.match.url
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  filterBy = () => {
    // TRY .filter() and split this function into two; one for type and one for status.
    // I THINK, FOR SANITY'S SAKE: MOVE THE DROP DOWNS INTO THIS COMPONENT AND HAVE THE NAV MAKE TO BE REQUESTS:
    // ONE FOR THE ARCHIVE, AND ONE FOR CURRENT PROJECTS; BOTH CAN USE LIST COMPONENT TO RENDER (I THINK)
  };

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
