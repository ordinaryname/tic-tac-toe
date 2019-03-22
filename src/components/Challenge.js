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
          {this.challenges}
        </div>
        <div className="myFriends">
          <input type="text" className="enterFriendName"/>
          <button className="findFriend">Search</button>
          {this.friends}
        </div>
      </div>
    );
  }
}

export default Challenge;
