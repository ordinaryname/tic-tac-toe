import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Challenge from './components/Challenge';
import Error from './components/Error';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/challenge" component={Challenge} exact/>
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
