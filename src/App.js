#!/usr/bin/env node
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Challenge from './components/Challenge';
import Game from './components/Game';
import Error from './components/Error';
import Login from './components/Login';
import Settings from './components/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/settings" component={Settings} exact/>
          <Route path="/challenge" component={Challenge} exact/>
          <Route path='/game' component={Game} exact/>
          <Route path='/login' render={(props) => <Login {...props} login={true} />}/>
          <Route path='/signup' render={(props) => <Login {...props} login={false} />}/>
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
