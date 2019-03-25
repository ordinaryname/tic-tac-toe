import React, {Component} from 'react';
import Header from './Header';
import anime from 'animejs';

class Challenge extends Component {

  constructor(props){
    super(props);
    this.state = {
      hasUsername:false,
    };
  }

  componentDidMount(){

  }

  getUser = () => {
    fetch('/users')
    .then(results => {return results.json();})
  }

  challenges = () => {
    return(
      <div className="challengesList"></div>
    );
  }

  friends = () => {
    return(
      <div className="friendsList"></div>
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
          <input type="text" className="enterFriendName" placeholder="Find A Friend"/>
          <button className="findFriend">Search</button>
          {this.friends()}
        </div>
        <div className="footer">
          <div className="footerText">&#169; <a href="https://raymondmutyaba.com/" className="copyrightText">Raymond Mutyaba</a> 2019</div>
        </div>
      </div>
    );
  }
}

export default Challenge;
