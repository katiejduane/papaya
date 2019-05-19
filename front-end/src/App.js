import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import List from './containers/Projects/List/List';
import DetailCard from './components/Cards/DetailCard/DetailCard';
import NewProject from './containers/Projects/AddNew/NewProject';
import EditProject from './containers/Projects/Edit/EditProject';
import Account from './containers/Auth/Account/Account';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/view/:" component={DetailCard} />
            <Route exact path="/addNew" component={NewProject} />
            <Route exact path="/edit/:" component={EditProject} />
            <Route exact path="/account/:" component={Account} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
