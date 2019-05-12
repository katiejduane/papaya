import React, { Component } from 'react';
import './App.css';
// import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>

        </Layout>
      </div>
    );
  }
}

export default App;
