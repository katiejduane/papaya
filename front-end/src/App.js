import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import List from './containers/IdeaList/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={List} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
