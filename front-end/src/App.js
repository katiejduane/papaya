import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import List from './containers/Projects/List/List';
import Details from './containers/Projects/Details/Details';
import NewProject from './containers/Projects/AddNew/NewProject';
import UpdateProject from './containers/Projects/Update/UpdateProject';
import Account from './containers/Auth/Account/Account';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/view/:" component={Details} />
            <Route exact path="/addNew" component={NewProject} />
            <Route exact path="/update/:" component={UpdateProject} />
            <Route exact path="/account/:" component={Account} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
