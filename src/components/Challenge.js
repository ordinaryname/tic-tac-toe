import React, {Component} from 'react';
import decode from 'jwt-decode';
import anime from 'animejs';
import Header from './Header';

class Challenge extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      friendRequests:[],
      challenges:[],
      userInput:'',
      listUsers: false,
      showUser: false,
      user: '',
      userId: '',
      users:[],
      friends:[],
    };
  }

  componentDidMount(){
    fetch('/users/me', {method: 'GET', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')})})
    .then(response => {return this.handleErrors(response)})
    .then(data => {
      let friendRequests = Object.values(data.friendRequest).map((friendRequest) => {
        return(
          <div className="friendRequest">
            <span className="friendRequestText">friendRequest</span>
            <svg width="20" height="20" viewBox="0 0 24 24" className="optionsIcon">
              <path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        );
      });
      let friends = Object.values(data.friends).map((friend) => {
        return(
          <div className="friends">
            <span className="friendText">friend</span>
            <svg width="20" height="20" viewBox="0 0 24 24" className="optionsIcon">
              <path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        );
      });
      let challenges = Object.values(data.challenges).map((challenge) => {
        return(
          <div className="challenges">
            <span className="challengeText">challenge.name</span>
            <button className="acceptButton" onClick={(event) => this.acceptChallenge(event, challenge._id)}>Accept</button>
            <button className="ignoreButton" onClick={(event) => this.ignoreChallenge(event, challenge._id)}>Ignore</button>
          </div>
        );
      });
      this.setState({username: data.name, friendRequests: friendRequests, friends: friends});
    })
    .catch(error => console.log(error));
  }

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  acceptChallenge = (event, id) => {
    event.preventDefault();
    const body = `friendId=${this.state.userId}`;
    fetch('/users/acceptChallenge', {method: 'PUT', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')}), body: body})
    .then(response => {})
    .catch(error => console.log(error))
  }

  ignoreChallenge = (event, id) => {
    event.preventDefault();
    const body = `friendId=${this.state.userId}`;
    fetch('/users/ignoreChallenge', {method: 'PUT', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')}), body: body})
    .then(response => {})
    .catch(error => console.log(error))
  }

  updateFindFriend = (event) => {
    this.setState({userInput:event.target.value});
    this.setState({showUser: false});
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
    this.setState({listUsers: false, showUser: true, user: name, userId: id});
    console.log(name);
  }

  friendRequests = () => {
    return(
      <div className="friendRequestList">{this.state.friendRequests}</div>
    );
  }

  challenges = () => {
    return(
      <div className="challengesList">{this.state.challenges}</div>
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

  userProfile = () => {
    return(
      <div className="userProfile">
        <span className="username">Add @{this.state.user} to friends list</span>
        <svg className="addButton" width="30" height="30" viewBox="0 0 24 24" onClick={(event) => this.sendFriendRequest(event)}>
          <path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </div>
    );
  }

  sendFriendRequest = (event) => {
    const body = `friendId=${this.state.userId}`;
    fetch('/users/addFriend', {method: 'PUT', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin', 'x-auth-token': localStorage.getItem('accessToken')}), body: body})
    .then(response => {})
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div className="challenge">
        <div className="box">
          <Header/>
          <div className="defaultDiv">
            <h2 className="defaultTitle">Friend Requests</h2>
            {this.friendRequests()}
            <h2 className="defaultTitle">Challenges</h2>
            {this.challenges()}
            <h2 className="defaultTitle">Friends</h2>
            <input type="text" className="defaultInput" placeholder="Find A Friend" onChange={this.updateFindFriend} onKeyUp={this.updateFindFriend}/>
            {this.state.listUsers?(this.userListHTML()):(null)}
            {this.state.showUser?(this.userProfile()):(null)}
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
