import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import List from "./containers/Projects/List/List";
import Details from "./containers/Projects/Details/Details";
import NewProject from "./containers/Projects/AddNew/NewProject";
import UpdateProject from "./containers/Projects/Update/UpdateProject";
import Account from "./containers/Auth/Account/Account";
import Splash from "./components/Splash/Splash";
import SignUp from "./containers/Auth/SignUp";
import SignIn from "./containers/Auth/SignIn";
import SignOut from "./containers/Auth/SignOut";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/splash" component={Splash} />
        <Redirect to="/splash" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Layout>
          <Switch>
            <Route exact path="/status/:status" component={List} />
            <Route exact path="/type/:typeid" component={List} />
            <Route exact path="/view/:id" component={Details} />
            <Route exact path="/addNew" component={NewProject} />
            <Route exact path="/update/:id" component={UpdateProject} />
            <Route exact path="/account/:userid" component={Account} />
            <Route exact path="/signout" componet={SignOut} />
            <Route exact path="/" component={List} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      );
    }

    return <div className="App">{routes}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(App);
