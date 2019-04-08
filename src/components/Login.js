import React, { Component } from 'react';
import decode from 'jwt-decode';
import Header from './Header';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      login:false,
      errorMsg:'',
      username:'',
      password:'',
    };
  }

  componentWillMount(){
    this.setState({login:this.props.login});
  }

  getUsername = (event) => {
    this.setState({username:event.target.value});
  }

  getPassword = (event) => {
    this.setState({password:event.target.value});
  }

  signup = (event) => {
    event.preventDefault();
    const url = '/signup';
    const signupData = `username=${this.state.username.toLowerCase()}&password=${this.state.password}`;
    fetch(url, {method: 'POST', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin'}), body: signupData});
  }

  login = (event) => {
    event.preventDefault();
    const url = '/login';
    const loginData = `username=${this.state.username.toLowerCase()}&password=${this.state.password}`;
    fetch(url, {method: 'POST', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'credentials': 'same-origin'}), body: loginData});
  }

  setLoginBoolean = (event, loginBoolean) => {
    event.preventDefault();
    this.setState({login:loginBoolean});
  }

  loginHTML = () => {
    return(
      <div className="loginHTML">
        <h2 className="defaultTitle">Login</h2>
        <input type="text" className="defaultInput" placeholder="username" onChange={this.getUsername} onKeyUp={this.getUsername}/>
        <input type="password" className="defaultInput" placeholder="password" onChange={this.getPassword} onKeyUp={this.getPassword}/>
        <button className="defaultButton" onClick={this.login}>Login</button>
        <button className="defaultButton" onClick={(event) => this.setLoginBoolean(event, false)}>Already have a username? Signup.</button>
        <div className="errorMsg">{this.state.errorMsg}</div>
      </div>
    );
  }

  signupHTML = () => {
    return(
      <div className="signupHTML">
        <h2 className="defaultTitle">Signup</h2>
        <input type="text" className="defaultInput" placeholder="username" onChange={this.getUsername} onKeyUp={this.getUsername}/>
        <input type="password" className="defaultInput" placeholder="password" onChange={this.getPassword} onKeyUp={this.getPassword}/>
        <button className="defaultButton" onClick={this.signup}>Create</button>
        <button className="defaultButton" onClick={(event) => this.setLoginBoolean(event, true)}>Already have a username? Login.</button>
        <div className="errorMsg">{this.state.errorMsg}</div>
      </div>
    );
  }

  render(){
    return(
      <div className="login">
        <div className="box">
          <Header/>
          <div className="defaultDiv">{this.state.login ? (this.loginHTML()) : (this.signupHTML())}</div>
        </div>
        <div className="footer">
          <div className="footerText">&#169; <a href="https://raymondmutyaba.com/" className="copyrightText">Raymond Mutyaba</a> 2019</div>
        </div>
      </div>
    );
  }
}
export default Login;
