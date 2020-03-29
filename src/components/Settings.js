import React, { Component } from 'react';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  saveSettings = (settingName, settingValue) => {
    localStorage.setItem(settingName, settingValue);
  }

  render() {
    return(
      <div className="settings">
        <h1 className="pageTitle">Settings</h1>
        <ul className="settingsList">

        </ul>
      </div>
    );
  }
}

export default Settings;
