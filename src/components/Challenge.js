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

  friends = () => {
    return(
      <div className="friendsList">{this.state.friends}</div>
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
            <button className="defaultButton" onClick={this.getUser}>Search</button>
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
