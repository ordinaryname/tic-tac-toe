import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

const {user} = require('../functions/Server');

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAccountMenu:false,
      showShopMenu:false,
      showNotificationDot: false,
      user:{},
    };
  }

  componentDidMount() {
    this.setState({user: user});
  }

  showAccountMenu = (event) => {
    event.preventDefault();
    this.setState({showAccountMenu:true}, ()=> {document.addEventListener('click', this.closeAccountMenu);});
  }

  closeAccountMenu = (event) => {
    try {
      if (!this.accountMenu.contains(event.target)) {
        this.setState({showAccountMenu:false}, ()=> {document.removeEventListener('click', this.closeAccountMenu);});
      }
    } catch(err) {}
  }

  showShopMenu = (event) => {
    event.preventDefault();
    this.setState({showShopMenu:true}, ()=> {document.addEventListener('click', this.closeShopMenu);});
  }

  closeShopMenu = (event) => {
    try {
      if (!this.shopMenu.contains(event.target)) {
        this.setState({showShopMenu:false}, ()=> {document.removeEventListener('click', this.closeShopMenu);});
      }
    } catch(err) {}
  }

  logout = (event) => {
    event.preventDefault();
    localStorage.setItem('accessToken', null);
    this.setState({user: {}});
    return <Redirect to='/'/>
  }

  accountMenuHTML = () => {
    if(this.state.user.name === undefined) {
      return(
        <div className="accountMenu" ref={(element) => {this.accountMenu = element;}}>
          <button className="userButton">Pick A Username</button>
          <Link to={{pathname:"/login", state:{proposedUsername:""}}}><button className="userButton">Log In</button></Link>
          <Link to={{pathname:"/signup", state:{proposedUsername:""}}}><button className="userButton">Create Username</button></Link>
          <Link to="/challenge"><button className="userButton">Challenge Friends</button></Link>
          <Link to="/settings"><button className="userButton">Settings</button></Link>
        </div>
      );
    } else {
      if(this.state.showNotificationDot){
        return(
          <div className="accountMenu" ref={(element) => {this.accountMenu = element;}}>
            <button className="userButton">Hello, {this.state.user.name}</button>
            <Link to="/challenge"><button className="userButton">Challenge Friends</button></Link>
            <Link to="/challenge"><button className="userButton">New Friend Request</button></Link>
            <button className="userButton" onClick={this.logout}>Log Out</button>
          </div>
        );
      } else {
        return(
          <div className="accountMenu" ref={(element) => {this.accountMenu = element;}}>
            <button className="userButton">Hello, {this.state.user.name}</button>
            <Link to="/challenge"><button className="userButton">Challenge Friends</button></Link>
            <Link to="/settings"><button className="userButton">Settings</button></Link>
            <button className="userButton" onClick={this.logout}>Log Out</button>
          </div>
        );
      }
    }
  }

  shopMenuHTML = () => {
    return(
      <div className="shopMenu" ref={(element) => {this.shopMenu = element;}}>
        <button className="shopButton">Use A Swap</button>
        <button className="shopButton">Buy A Swap</button>
        <button className="shopButton">Leave A Tip</button>
      </div>
    );
  }

  notificationDotHTML = () => {
    return(
      <li className="menuItem">
        <svg width="16" height="16" className="redDot">
          <circle cx="8" cy="8" r="8" fill="red" />
        </svg>
      </li>
    );
  }

  render() {
    return(
      <div className="header">
        <button className="homeButton">Tic Tac Toe</button>
        <ul className="menu">
          <li className="menuItem">
            <div>{this.state.user.name}</div>
            <svg width="100" height="100" viewBox="0 0 24 24" className="accountIcon" alt="Account Icon" onClick={this.showAccountMenu}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </li>
          {this.state.showNotificationDot?(this.notificationDotHTML()):(null)}
        </ul>
        {this.state.showAccountMenu?(this.accountMenuHTML()):(null)}
        {this.state.showShopMenu?(this.shopMenuHTML()):(null)}
      </div>
    );
  }
}

export default Header;
