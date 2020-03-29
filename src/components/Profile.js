import React, { Component } from 'react';
import Header from './Header';
import anime from 'animejs';

const {user} = require('../functions/Server');

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:{},
    };
  }

  componentDidMount(){
    this.setState({user:user});
  }
  render() {
    return(
      <div className="profile">{this.state.user.name}</div>
    );
  }
}
