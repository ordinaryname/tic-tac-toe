import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Error from './components/Error';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
