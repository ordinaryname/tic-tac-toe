import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAccountMenu:false,
      showShopMenu:false,
    };
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

  render() {
    return(
      <div className="header">
        <button className="homeButton">Tic Tac Toe</button>
        <ul className="menu">
          <li className="menuItem">
            <svg width="100" height="100" viewBox="0 0 24 24" className="inAppPurchases" alt="In App Purchases" onClick={this.showShopMenu}>
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </li>
          <li className="menuItem">
            <svg width="100" height="100" viewBox="0 0 24 24" className="accountIcon" alt="Account Icon" onClick={this.showAccountMenu}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </li>
        </ul>
        {this.state.showAccountMenu?(
          <div className="accountMenu" ref={(element) => {this.accountMenu = element;}}>
            <button className="userButton">Pick A Username</button>
            <Link to="/login"><button className="userButton">Log In</button></Link>
            <Link to="/signup"><button className="userButton">Create Username</button></Link>
            <Link to="/challenge"><button className="userButton">Challenge Friends</button></Link>
          </div>
        ):(null)}
        {this.state.showShopMenu?(
          <div className="shopMenu" ref={(element) => {this.shopMenu = element;}}>
            <button className="shopButton">Use A Swap</button>
            <button className="shopButton">Buy A Swap</button>
            <button className="shopButton">Leave A Tip</button>
          </div>
        ):(null)}
      </div>
    );
  }
}

export default Header;
