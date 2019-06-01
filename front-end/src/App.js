import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import List from './containers/Projects/List/List';
import Details from './containers/Projects/Details/Details';
import NewProject from './containers/Projects/AddNew/NewProject';
import UpdateProject from './containers/Projects/Update/UpdateProject';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
import Account from './containers/Auth/Account/Account';
import Splash from './components/Splash/Splash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={List} />
            {/* but what about if they're not logged in!? must redirect '/' to splash */}
            <Route exact path="/status/:status" component={List} />
            <Route exact path="/type/:typeid" component={List} />
            <Route exact path="/archive" component={List} />
            <Route exact path="/view/:id" component={Details} />
            <Route exact path="/addNew" component={NewProject} />
            <Route exact path="/update/:" component={UpdateProject} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/account/:" component={Account} />
            <Route exact path="/splash" component={Splash} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
