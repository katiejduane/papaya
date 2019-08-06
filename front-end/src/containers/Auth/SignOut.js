import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

class SignOut extends Component {
  componentDidMount() {
    console.log("logging out");
    this.props.signOut();
  }

  render() {
    return <Redirect to="/splash" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignOut);
