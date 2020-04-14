import React, { Component } from 'react';
import Header from './Header';
import anime from 'animejs';

const {user} = require('../functions/Server');

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:{},
      player:"",
      currentTab:"notifications",
    };
  }

  componentDidMount(){
    this.setState({user:user, player:this.props.match.params.player});
  }

  setTab = (event, tabName) => {
    event.preventDefault();
    this.setState({currentTab:tabName});
    if(tabName === "notifications"){
      if(!this.notificationsTab.classList.contains("activeTab")){
        this.notificationsTab.classList.add("activeTab");
      }
      this.rankingsTab.classList.remove("activeTab");
      this.challengersTab.classList.remove("activeTab");
    } else if(tabName === "rankings"){
      if(!this.rankingsTab.classList.contains("activeTab")){
        this.rankingsTab.classList.add("activeTab");
      }
      this.notificationsTab.classList.remove("activeTab");
      this.challengersTab.classList.remove("activeTab");
    } else if(tabName === "challengers"){
      if(!this.challengersTab.classList.contains("activeTab")){
        this.challengersTab.classList.add("activeTab");
      }
      this.notificationsTab.classList.remove("activeTab");
      this.rankingsTab.classList.remove("activeTab");
    }
  }

  renderTab = () => {
    if(this.state.currentTab === "notifications"){
      return(
        <div className="notifications"><p>No new notifications</p></div>
      );
    } else if(this.state.currentTab === "rankings"){
      return(
        <div className="rankings"><p>You are rank one of one</p></div>
      );
    } else if(this.state.currentTab === "challengers"){
      return(
        <div className="challengers"><p>No new challengers</p></div>
      );
    }
  }

  render() {
    return(
      <div className="Player">
        <Header />
        <h1 className="usernameTitle">{(this.state.user.name)?(this.state.user.name):('Player Name')}</h1>
        <ul className="tabs">
          <li className="tabTitle activeTab" onClick={(event) => this.setTab(event, 'notifications')} ref={(element) => {this.notificationsTab = element;}}>{'Notifications'}</li>
          <li className="tabTitle" onClick={(event) => this.setTab(event, 'rankings')} ref={(element) => {this.rankingsTab = element;}}>{'Rankings'}</li>
          <li className="tabTitle" onClick={(event) => this.setTab(event, 'challengers')} ref={(element) => {this.challengersTab = element;}}>{'Challengers'}</li>
        </ul>
        {this.renderTab()}
      </div>
    );
  }
}

export default Player;
