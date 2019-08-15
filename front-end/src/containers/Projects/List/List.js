import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axiosInstance";
import { Redirect } from "react-router-dom";

import Aux from "../../../hoc/Aux/Aux";
import styles from "./List.module.css";
import MiniCard from "../../../components/Cards/MiniCard/MiniCard";
// import DropDown from "../../../components/UI/Dropdown/DropDown";
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
    _isMounted: false
  };

  componentDidMount() {
    if (this.props.types.length < 1) {
      console.log("requesting types");
      this.props.getProjectTypes();
    }
    console.log(this.props);
    //get projects from backend
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // let typesArray = this.props.types.map(type => {
    //   return (
    //     <option key={type.id} value={type.id}>
    //       {type.typename}
    //     </option>
    //   );
    // });

    // let statsArray = this.state.status.map(status => {
    //   return (
    //     <option key={status.value} value={status.value}>
    //       {status.displayValue}
    //     </option>
    //   );
    // });

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
          {/* <DropDown
            selectClass="byStatus"
            defaultVal="Idea"
            defaultDisplayVal="View by Status"
            vals={statsArray}
          />
          <DropDown
            selectClass="byType"
            defaultVal={typesArray[0]}
            defaultDisplayVal="View by Type"
            vals={typesArray}
          /> */}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
