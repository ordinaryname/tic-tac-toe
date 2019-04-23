import React, {Component} from 'react';
import decode from 'jwt-decode';
import anime from 'animejs';
import Header from './Header';

class Challenge extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasUsername:false,
      userInput:'',
      listUsers: false,
      showUser: false,
      user: '',
      users:[],
      friends:[],
    };
  }

  componentDidMount(){

  }

  updateFindFriend = (event) => {
    this.setState({userInput:event.target.value});
    if(this.state.userInput.length === 0) {
      this.setState({listUsers: false});
    } else {
      this.getUser();
    }
  }

  getUser = () => {
    fetch(`/users/findFriend/?searchString=${this.state.userInput}`, {method: 'GET', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')})})
    .then(results => {return results.json();})
    .then(data => {
      let users = Object.values(data).map((user) => {

        return(<button className="userListItem" key={user.name} onClick={(event) => this.showUser(event, user._id, user.name)}>{user.name}</button>)
      })
      this.setState({users: users, listUsers: true});
    })
  }

  showUser = (event, id, name) => {
    event.preventDefault();
    this.setState({listUsers: false, showUser: true, user: name});
    console.log(name);
  }

  challenges = () => {
    return(
      <div className="challengesList"></div>
    );
  }

  friends = () => {
    return(
      <div className="friendsList">{this.state.friends}</div>
    );
  }

  userListHTML = () => {
    return(
      <div className="userList">{this.state.users}</div>
    );
  }

  userProfile = (username) => {
    return(
      <div className="userProfile">
        <span className="username">Add @{username} to friends list</span>
        <svg className="addButton" width="50" height="50" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </div>
    );
  }

  render(){
    return(
      <div className="challenge">
        <div className="box">
          <Header/>
          <div className="defaultDiv">
            <h2 className="defaultTitle">My Challenges</h2>
            {this.challenges()}
            <h2 className="defaultTitle">My Friends</h2>
            <input type="text" className="defaultInput" placeholder="Find A Friend" onChange={this.updateFindFriend} onKeyUp={this.updateFindFriend}/>
            {this.state.listUsers?(this.userListHTML()):(null)}
            {this.state.showUser?(this.userProfile(this.state.user)):(null)}
            {this.friends()}
          </div>
        </div>
        <div className="footer">
          <div className="footerText">&#169; <a href="https://raymondmutyaba.com/" className="copyrightText">Raymond Mutyaba</a> 2019</div>
        </div>
      </div>
    );
  }
}

export default Challenge;
