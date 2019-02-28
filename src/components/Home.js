import React, { Component } from 'react';
import anime from 'animejs';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {player: "x", errorMsg:"", grid: [{"cell-00":"none", "cell-01":"none", "cell-02":"none", "cell-10":"none", "cell-11":"none", "cell-12":"none", "cell-20":"none", "cell-21":"none", "cell-22":"none",}],};
    this.cell = [];
    this.toggleButton = React.createRef();
    this.toggleButtonText = "Play As O";
  }

  componentDidUpdate() {
    this.anime();
  }

  componentDidMount() {
    console.log(this.state.grid);
  }

  anime = () => {
    anime({
      targets: this.square,
      translateY: {value: 500},
      duration: 3000
    });
    anime({
      targets: this.circle,
      translateY: {value: 500},
      duration: 3000,
    });
  }

  togglePlayer = (event) => {
    event.preventDefault();
    if(this.state.player === "x") {
      this.toggleButton.classList.remove("x");
      this.toggleButton.classList.add("o");
      this.toggleButtonText = "Play As X";
      this.setState({player:"o"});
    } else if(this.state.player === "o") {
      this.toggleButton.classList.remove("o");
      this.toggleButton.classList.add("x");
      this.toggleButtonText = "Play As O";
      this.setState({player:"x"});
    }
  }

  selectCell = (event, cellName) => {
    event.preventDefault();
    if(this.state.grid[0][cellName] === "none") {
      // Update grid item with player piece
      let cells = this.state.grid;
      cells[0][cellName] = this.state.player;
      this.setState({grid:cells, errorMsg:""});
    } else if (this.state.grid[0][cellName] === "x" || this.state.grid[0][cellName] === "o") {
      this.setState({errorMsg:"Please select an empty square"});
    }
    for(var key in Object.keys(this.state.grid[0])) {
      if(this.state.grid[0][key] === "none"){
        break;
      } else if(key === "cell-22" && this.state.grid[0][key] !== "none") {
        this.setState({errorMsg:"Game Over"});
      }
    }
    console.log(this.state.grid);
  }

  renderCell = (cellName) => {
    if(this.state.grid[0][cellName] === "o") {
      return(
        <svg width="90" height="90" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      );
    } else if(this.state.grid[0][cellName] === "x") {
      return(
        <svg width="100" height="100" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      );
    } else {
      return(
        <svg width="100" height="100">
          <rect width="100" height="100" fill="rgb(255,255,255)" strokeWidth="2" stroke="rgb(60,60,60)"/>
        </svg>
      );
    }
  }

  svgHolder = () => {
    return(
      {/*
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="50" fill="red" />
        </svg>
        <svg width="100" height="100">
          <rect width="100" height="100" fill="rgb(0,0,255)" />
        </svg>
        <svg width="100" height="100">
          <rect width="100" height="100" fill="rgb(255,255,255)" strokeWidth="2" stroke="rgb(60,60,60)"/>
        </svg>
      */}
    );
  }

  render() {
    return(
      <div className="Home">
        <div className="togglePlayer">
          <button className="x togglePlayerBtn" onClick={(event) => this.togglePlayer(event)} ref={(element) => {this.toggleButton = element;}}>{this.toggleButtonText}</button>
        </div>
        <div className="container">
          <div className="cell cell-00" onClick={(event) => this.selectCell(event, "cell-00")} ref={(element) => {this.cell["cell-00"] = element;}}>
            {this.renderCell("cell-00")}
          </div>
          <div className="cell cell-01" onClick={(event) => this.selectCell(event, "cell-01")} ref={(element) => {this.cell["cell-01"] = element;}}>
            {this.renderCell("cell-01")}
          </div>
          <div className="cell cell-02" onClick={(event) => this.selectCell(event, "cell-02")} ref={(element) => {this.cell["cell-02"] = element;}}>
            {this.renderCell("cell-02")}
          </div>
          <div className="cell cell-10" onClick={(event) => this.selectCell(event, "cell-10")} ref={(element) => {this.cell["cell-10"] = element;}}>
            {this.renderCell("cell-10")}
          </div>
          <div className="cell cell-11" onClick={(event) => this.selectCell(event, "cell-11")} ref={(element) => {this.cell["cell-11"] = element;}}>
            {this.renderCell("cell-11")}
          </div>
          <div className="cell cell-12" onClick={(event) => this.selectCell(event, "cell-12")} ref={(element) => {this.cell["cell-12"] = element;}}>
            {this.renderCell("cell-12")}
          </div>
          <div className="cell cell-20" onClick={(event) => this.selectCell(event, "cell-20")} ref={(element) => {this.cell["cell-20"] = element;}}>
            {this.renderCell("cell-20")}
          </div>
          <div className="cell cell-21" onClick={(event) => this.selectCell(event, "cell-21")} ref={(element) => {this.cell["cell-21"] = element;}}>
            {this.renderCell("cell-21")}
          </div>
          <div className="cell cell-22" onClick={(event) => this.selectCell(event, "cell-22")} ref={(element) => {this.cell["cell-22"] = element;}}>
            {this.renderCell("cell-22")}
          </div>
        </div>

        <div className="errorMsg">{this.state.errorMsg}</div>
      </div>
    );
  }

}

export default Home;
