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

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/splash" component={Splash} />
        <Route exact path="/" component={List} />
        <Redirect to="/splash" />
        {/* // not sure if i need the "/" here or not to allow redirect to 'splash' */}
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Layout>
          <Switch>
            <Route exact path="/status/:status" component={List} />
            <Route exact path="/type/:typeid" component={List} />
            <Route exact path="/archive" component={List} />
            <Route exact path="/view/:id" component={Details} />
            <Route exact path="/addNew" component={NewProject} />
            <Route exact path="/update/:" component={UpdateProject} />
            <Route exact path="/" component={List} />
            <Route exact path="/account/:" component={Account} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      );
    }

    return <div className="App">{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(App);
