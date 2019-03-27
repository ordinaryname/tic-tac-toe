import React, {Component} from 'react';
import Header from './Header';
import anime from 'animejs';

class Challenge extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasUsername:false,
      userInput:'',
      friends:[],
    };
  }

  componentDidMount(){

  }

  updateFindFriend = (event) => {
    this.setState({userInput:event.target.value});
  }

  getUser = (event) => {
    event.preventDefault();
    fetch(`/users/${this.state.userInput}`)
    .then(results => {return results.json();})
    .then(data => {
      let friends = Object.values(data).map((friend) => {
        console.log({friend});
        return({friend}["friend"])
      })
      this.setState({friends: friends});
    })
  }

  challenges = () => {
    return(
      <div className="challengesList"></div>
    );
  }

  render(){
    return(
      <div className="challenge">
        <Header/>
        <div className="myChallenges">
        <h2 className="myChallengesTitle">My Challenges</h2>
          {this.challenges()}
        </div>
        <div className="myFriends">
          <h2 className="myFriendsTitle">My Friends</h2>
          <input type="text" className="enterFriendName" placeholder="Find A Friend" onChange={this.updateFindFriend} onKeyUp={this.updateFindFriend}/>
          <button className="findFriend" onClick={this.getUser}>Search</button>
          <div className="friendsList">{this.state.friends}</div>
        </div>
        <div className="footer">
          <div className="footerText">&#169; <a href="https://raymondmutyaba.com/" className="copyrightText">Raymond Mutyaba</a> 2019</div>
        </div>
      </div>
    );
  }
}

export default Challenge;
