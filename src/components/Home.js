import React, { Component } from 'react';
import anime from 'animejs';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: "x",
      xScore: 0,
      oScore: 0,
      errorMsg: "",
      grid:
        [
          {"cell-00":"none", "cell-01":"none", "cell-02":"none", "cell-03":"none", "cell-04":"none", "cell-05":"none", "cell-06":"none", "cell-07":"none", "cell-08":"none",},
          {"cell-09":"none", "cell-10":"none", "cell-11":"none", "cell-12":"none", "cell-13":"none", "cell-14":"none", "cell-15":"none", "cell-16":"none", "cell-17":"none",},
          {"cell-18":"none", "cell-19":"none", "cell-20":"none", "cell-21":"none", "cell-22":"none", "cell-23":"none", "cell-24":"none", "cell-25":"none", "cell-26":"none",},
          {"cell-27":"none", "cell-28":"none", "cell-29":"none", "cell-30":"none", "cell-31":"none", "cell-32":"none", "cell-33":"none", "cell-34":"none", "cell-35":"none",},
          {"cell-36":"none", "cell-37":"none", "cell-38":"none", "cell-39":"none", "cell-40":"none", "cell-41":"none", "cell-42":"none", "cell-43":"none", "cell-44":"none",},
          {"cell-45":"none", "cell-46":"none", "cell-47":"none", "cell-48":"none", "cell-49":"none", "cell-50":"none", "cell-51":"none", "cell-52":"none", "cell-53":"none",},
          {"cell-54":"none", "cell-55":"none", "cell-56":"none", "cell-57":"none", "cell-58":"none", "cell-59":"none", "cell-60":"none", "cell-61":"none", "cell-62":"none",},
          {"cell-63":"none", "cell-64":"none", "cell-65":"none", "cell-66":"none", "cell-67":"none", "cell-68":"none", "cell-69":"none", "cell-70":"none", "cell-71":"none",},
          {"cell-72":"none", "cell-73":"none", "cell-74":"none", "cell-75":"none", "cell-76":"none", "cell-77":"none", "cell-78":"none", "cell-79":"none", "cell-80":"none",},
        ],
      container: [{"container-00":"none", "container-01":"none", "container-02":"none", "container-03":"none", "container-04":"active", "container-05":"none", "container-06":"none", "container-07":"none", "container-08":"none",}],
    };
    this.cell = [];
    this.containers = [];
    this.toggleButton = React.createRef();
    this.toggleButtonText = "Play As O";
    this.turn = 0;
  }

  componentDidUpdate() {
  }

  componentDidMount() {
  }

  anime = (box1, box2, box3) => {
    anime({
      targets: box1,
      fill: [
        {value: '#cc0000', duration: 3000, delay: 250},
        {value: '#000000', duration: 3000}
      ]
    });
    anime({
      targets: box2,
      fill: [
        {value: '#cc0000', duration: 3000, delay: 500},
        {value: '#000000', duration: 3000}
      ]
    });
    anime({
      targets: box3,
      fill: [
        {value: '#cc0000', duration: 3000, delay: 750},
        {value: '#000000', duration: 3000}
      ]
    });
    anime({
      targets: '.score',
      color: [
        {value: '#cc0000', duration: 1500, delay: 250},
        {value: '#000000', duration: 1500}
      ]
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

  selectCell = (event, gridNumber, cellName) => {
    event.preventDefault();
    if(this.state.grid[gridNumber][cellName] === "none") {
      // Update grid item with player piece
      let cells = this.state.grid;
      cells[gridNumber][cellName] = this.state.player;
      this.setState({grid:cells, errorMsg:""});
      this.turn += 1;
      this.updateScore(gridNumber, cellName);
    } else if (this.state.grid[gridNumber][cellName] === "x" || this.state.grid[gridNumber][cellName] === "o") {
      this.setState({errorMsg:"Please select an empty square"});
    }
    for(var key in this.state.grid[gridNumber]) {
      if(this.state.grid[gridNumber][key] === "none"){
        break;
      } else if(key === "cell-44" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"none", "container-01":"none", "container-02":"none", "container-03":"none", "container-04":"active", "container-05":"active", "container-06":"none", "container-07":"none", "container-08":"none",}]});
        this.containers["container-05"].classList.add("active");
      } else if(key === "cell-53" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"none", "container-01":"none", "container-02":"active", "container-03":"none", "container-04":"active", "container-05":"active", "container-06":"none", "container-07":"none", "container-08":"none",}]});
        this.containers["container-02"].classList.add("active");
      } else if(key === "cell-26" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"none", "container-01":"active", "container-02":"active", "container-03":"none", "container-04":"active", "container-05":"active", "container-06":"none", "container-07":"none", "container-08":"none",}]});
        this.containers["container-01"].classList.add("active");
      } else if(key === "cell-17" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"active", "container-01":"active", "container-02":"active", "container-03":"none", "container-04":"active", "container-05":"active", "container-06":"none", "container-07":"none", "container-08":"none",}]});
        this.containers["container-00"].classList.add("active");
      } else if(key === "cell-08" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"active", "container-01":"active", "container-02":"active", "container-03":"active", "container-04":"active", "container-05":"active", "container-06":"none", "container-07":"none", "container-08":"none",}]});
        this.containers["container-03"].classList.add("active");
      } else if(key === "cell-35" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"active", "container-01":"active", "container-02":"active", "container-03":"active", "container-04":"active", "container-05":"active", "container-06":"active", "container-07":"none", "container-08":"none",}]});
        this.containers["container-06"].classList.add("active");
      } else if(key === "cell-62" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"active", "container-01":"active", "container-02":"active", "container-03":"active", "container-04":"active", "container-05":"active", "container-06":"active", "container-07":"active", "container-08":"none",}]});
        this.containers["container-07"].classList.add("active");
      } else if(key === "cell-71" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({container:[{"container-00":"active", "container-01":"active", "container-02":"active", "container-03":"active", "container-04":"active", "container-05":"active", "container-06":"active", "container-07":"active", "container-08":"active",}]});
        this.containers["container-08"].classList.add("active");
      } else if(key === "cell-80" && this.state.grid[gridNumber][key] !== "none") {
        this.setState({errorMsg:"Game Over"});
      }
    }
  }

  renderCell = (gridNumber, cellName) => {
    if(this.state.grid[gridNumber][cellName] === "o") {
      return(
        <svg width="100" height="100" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      );
    } else if(this.state.grid[gridNumber][cellName] === "x") {
      return(
        <svg width="100" height="100" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      );
    } else {
      return(
        <svg width="100" height="100">
          <rect width="100" height="100" fill="rgb(255,255,255)" />
        </svg>
      );
    }
  }

  updateScore = (gridNumber, cellName) => {
    let xScore = this.state.xScore;
    let oScore = this.state.oScore;

    let checker = (cell1, cell2, cell3) => {
      if(cellName === cell1 || cellName === cell2 || cellName === cell3) {
        if(this.state.grid[gridNumber][cell1] === "x" && this.state.grid[gridNumber][cell2] === "x" && this.state.grid[gridNumber][cell3] === "x") {
          xScore += 1;
          this.anime('.' + cell1 + ' svg', '.' + cell2 + ' svg', '.' + cell3 + ' svg');
          console.log('.' + cell1 + ' svg path', '.' + cell2 + ' svg path', '.' + cell3 + ' svg path');
          return true;
        } else if(this.state.grid[gridNumber][cell1] === "o" && this.state.grid[gridNumber][cell2] === "o" && this.state.grid[gridNumber][cell3] === "o") {
          oScore += 1;
          this.anime('.' + cell1 + ' svg', '.' + cell2 + ' svg', '.' + cell3 + ' svg');
          console.log('.' + cell1 + ' svg path', '.' + cell2 + ' svg path', '.' + cell3 + ' svg path');
          return true;
        }
      }
      return false;
    };

    if(this.turn > 4 && this.turn <= 9) {
      //Container 04
      var array = [["cell-36", "cell-37", "cell-38"],["cell-39", "cell-40", "cell-41"],["cell-42", "cell-43", "cell-44"],["cell-36", "cell-39", "cell-42"],["cell-37", "cell-40", "cell-43"],["cell-38", "cell-41", "cell-44"],["cell-36", "cell-40", "cell-44"],["cell-38", "cell-40", "cell-42"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 9 && this.turn <= 18) {
      //Container 05
      array = [["cell-45", "cell-46", "cell-47"],["cell-48", "cell-49", "cell-50"],["cell-51", "cell-52", "cell-53"],["cell-45", "cell-48", "cell-51"],["cell-46", "cell-49", "cell-52"],["cell-47", "cell-50", "cell-53"],["cell-45", "cell-49", "cell-53"],["cell-47", "cell-49", "cell-51"],["cell-46", "cell-45", "cell-38"],["cell-49", "cell-48", "cell-41"],["cell-52", "cell-51", "cell-44"],["cell-45", "cell-38", "cell-37"],["cell-48", "cell-41", "cell-40"],["cell-51", "cell-44", "cell-43"],["cell-52", "cell-48", "cell-38"],["cell-51", "cell-41", "cell-37"],["cell-45", "cell-41", "cell-43"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 18 && this.turn <= 27) {
      //Container 02
      array = [["cell-18", "cell-19", "cell-20"],["cell-21", "cell-22", "cell-23"],["cell-24", "cell-25", "cell-26"],["cell-18", "cell-21", "cell-24"],["cell-19", "cell-22", "cell-25"],["cell-20", "cell-23", "cell-26"],["cell-18", "cell-22", "cell-26"],["cell-20", "cell-22", "cell-24"],["cell-21", "cell-24", "cell-45"],["cell-22", "cell-25", "cell-46"],["cell-23", "cell-26", "cell-47"],["cell-24", "cell-45", "cell-48"],["cell-25", "cell-46", "cell-49"],["cell-26", "cell-47", "cell-50"],["cell-21", "cell-25", "cell-47"],["cell-24", "cell-46", "cell-50"],["cell-23", "cell-25", "cell-45"],["cell-26", "cell-46", "cell-48"],["cell-25", "cell-45", "cell-41"],["cell-23", "cell-25", "cell-45"],["cell-24", "cell-38", "cell-40"],["cell-22", "cell-24", "cell-38"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 27 && this.turn <= 36) {
      //Container 01
      array = [["cell-09", "cell-10", "cell-11"],["cell-12", "cell-13", "cell-14"],["cell-15", "cell-16", "cell-17"],["cell-09", "cell-12", "cell-15"],["cell-10", "cell-13", "cell-16"],["cell-11", "cell-14", "cell-17"],["cell-09", "cell-13", "cell-17"],["cell-11", "cell-13", "cell-15"],["cell-12", "cell-15", "cell-36"],["cell-13", "cell-16", "cell-37"],["cell-14", "cell-17", "cell-38"],["cell-15", "cell-36", "cell-39"],["cell-16", "cell-37", "cell-40"],["cell-17", "cell-38", "cell-41"],["cell-12", "cell-16", "cell-38"],["cell-14", "cell-16", "cell-36"],["cell-15", "cell-37", "cell-41"],["cell-17", "cell-37", "cell-39"],["cell-13", "cell-17", "cell-45"],["cell-17", "cell-45", "cell-49"],["cell-10", "cell-11", "cell-18"],["cell-13", "cell-14", "cell-21"],["cell-16", "cell-17", "cell-24"],["cell-11", "cell-18", "cell-19"],["cell-14", "cell-21", "cell-22"],["cell-17", "cell-24", "cell-25"],["cell-11", "cell-21", "cell-25"],["cell-10", "cell-14", "cell-24"],["cell-14", "cell-24", "cell-46"],["cell-16", "cell-38", "cell-48"],["cell-16", "cell-14", "cell-18"],["cell-17", "cell-21", "cell-19"],["cell-17", "cell-21", "cell-37"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 36 && this.turn <= 45) {
      //Container 00
      array = [["cell-00", "cell-01", "cell-02"],["cell-03", "cell-04", "cell-05"],["cell-06", "cell-07", "cell-08"],["cell-00", "cell-03", "cell-06"],["cell-01", "cell-04", "cell-07"],["cell-02", "cell-05", "cell-08"],["cell-00", "cell-04", "cell-08"],["cell-02", "cell-04", "cell-06"],["cell-01", "cell-02", "cell-09"],["cell-04", "cell-05", "cell-12"],["cell-07", "cell-08", "cell-15"],["cell-02", "cell-09", "cell-10"],["cell-05", "cell-12", "cell-13"],["cell-08", "cell-15", "cell-16"],["cell-01", "cell-05", "cell-15"],["cell-02", "cell-12", "cell-16"],["cell-05", "cell-15", "cell-37"],["cell-04", "cell-08", "cell-36"],["cell-08", "cell-36", "cell-40"],["cell-07", "cell-05", "cell-09"],["cell-08", "cell-12", "cell-10"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 45 && this.turn <= 54) {
      //Container 03
      array = [["cell-27", "cell-28", "cell-29"],["cell-30", "cell-31", "cell-32"],["cell-33", "cell-34", "cell-35"],["cell-27", "cell-30", "cell-33"],["cell-28", "cell-31", "cell-34"],["cell-29", "cell-32", "cell-35"],["cell-27", "cell-31", "cell-35"],["cell-29", "cell-31", "cell-33"],["cell-27", "cell-06", "cell-03"],["cell-28", "cell-07", "cell-04"],["cell-29", "cell-08", "cell-05"],["cell-30", "cell-27", "cell-06"],["cell-31", "cell-28", "cell-07"],["cell-32", "cell-29", "cell-08"],["cell-32", "cell-28", "cell-06"],["cell-29", "cell-07", "cell-03"],["cell-27", "cell-07", "cell-05"],["cell-28", "cell-08", "cell-12"],["cell-29", "cell-15", "cell-13"],["cell-30", "cell-28", "cell-08"],["cell-31", "cell-29", "cell-15"],["cell-32", "cell-36", "cell-16"],["cell-34", "cell-32", "cell-36"],["cell-35", "cell-39", "cell-37"],["cell-29", "cell-07", "cell-39"],["cell-29", "cell-39", "cell-43"],["cell-28", "cell-32", "cell-42"],["cell-28", "cell-29", "cell-36"],["cell-31", "cell-32", "cell-39"],["cell-34", "cell-35", "cell-42"],["cell-29", "cell-36", "cell-37"],["cell-32", "cell-39", "cell-40"],["cell-35", "cell-42", "cell-43"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 54 && this.turn <= 63) {
      //Container 06
      array = [["cell-54", "cell-55", "cell-56"],["cell-57", "cell-58", "cell-59"],["cell-60", "cell-61", "cell-62"],["cell-54", "cell-57", "cell-60"],["cell-55", "cell-58", "cell-61"],["cell-56", "cell-59", "cell-62"],["cell-54", "cell-58", "cell-62"],["cell-56", "cell-58", "cell-60"],["cell-57", "cell-54", "cell-33"],["cell-58", "cell-55", "cell-34"],["cell-59", "cell-56", "cell-35"],["cell-54", "cell-33", "cell-30"],["cell-55", "cell-34", "cell-31"],["cell-56", "cell-35", "cell-32"],["cell-54", "cell-34", "cell-32"],["cell-57", "cell-55", "cell-35"],["cell-55", "cell-35", "cell-39"],["cell-58", "cell-56", "cell-42"],["cell-56", "cell-42", "cell-40"],["cell-59", "cell-55", "cell-33"],["cell-56", "cell-34", "cell-30"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 63 && this.turn <= 72) {
      //Container 07
      array = [["cell-63", "cell-64", "cell-65"],["cell-66", "cell-67", "cell-68"],["cell-69", "cell-70", "cell-71"],["cell-63", "cell-66", "cell-69"],["cell-64", "cell-67", "cell-70"],["cell-65", "cell-68", "cell-71"],["cell-63", "cell-67", "cell-71"],["cell-65", "cell-67", "cell-69"],["cell-66", "cell-63", "cell-42"],["cell-67", "cell-64", "cell-43"],["cell-68", "cell-65", "cell-44"],["cell-63", "cell-42", "cell-39"],["cell-64", "cell-43", "cell-40"],["cell-65", "cell-44", "cell-41"],["cell-64", "cell-63", "cell-56"],["cell-67", "cell-66", "cell-59"],["cell-70", "cell-69", "cell-62"],["cell-63", "cell-56", "cell-55"],["cell-66", "cell-59", "cell-58"],["cell-69", "cell-62", "cell-61"],["cell-67", "cell-63", "cell-35"],["cell-63", "cell-35", "cell-31"],["cell-67", "cell-65", "cell-51"],["cell-65", "cell-51", "cell-49"],["cell-63", "cell-59", "cell-61"],["cell-63", "cell-43", "cell-59"],["cell-63", "cell-43", "cell-41"],["cell-68", "cell-64", "cell-42"],["cell-64", "cell-42", "cell-32"],["cell-64", "cell-44", "cell-48"],["cell-64", "cell-66", "cell-62"],["cell-65", "cell-43", "cell-39"],["cell-69", "cell-59", "cell-55"],["cell-66", "cell-56", "cell-34"],["cell-70", "cell-66", "cell-56"],["cell-68", "cell-64", "cell-42"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    } else if(this.turn > 72 && this.turn <= 81) {
      //Container 08
      array = [["cell-72", "cell-73", "cell-74"],["cell-75", "cell-76", "cell-77"],["cell-78", "cell-79", "cell-80"],["cell-72", "cell-75", "cell-78"],["cell-73", "cell-76", "cell-79"],["cell-74", "cell-77", "cell-80"],["cell-72", "cell-76", "cell-80"],["cell-74", "cell-76", "cell-78"],["cell-75", "cell-72", "cell-51"],["cell-76", "cell-73", "cell-52"],["cell-77", "cell-74", "cell-53"],["cell-72", "cell-51", "cell-48"],["cell-73", "cell-52", "cell-49"],["cell-74", "cell-53", "cell-50"],["cell-73", "cell-72", "cell-65"],["cell-76", "cell-75", "cell-68"],["cell-79", "cell-78", "cell-71"],["cell-72", "cell-65", "cell-64"],["cell-75", "cell-68", "cell-67"],["cell-78", "cell-71", "cell-70"],["cell-72", "cell-68", "cell-70"],["cell-72", "cell-52", "cell-68"],["cell-72", "cell-52", "cell-50"],["cell-72", "cell-44", "cell-40"],["cell-76", "cell-72", "cell-44"],["cell-73", "cell-75", "cell-71"],["cell-75", "cell-73", "cell-53"],["cell-78", "cell-68", "cell-64"],["cell-75", "cell-65", "cell-43"],["cell-79", "cell-75", "cell-65"],["cell-73", "cell-51", "cell-41"],["cell-77", "cell-73", "cell-51"],["cell-74", "cell-52", "cell-48"]];
      array.forEach(function(element){
        checker(element[0], element[1], element[2]);
      });
    }
    this.setState({xScore: xScore});
    this.setState({oScore: oScore});
  }

  render() {
    return(
      <div className="Home">
        <div className="scoreboard">
          <h1 className="score">X : {this.state.xScore} | O : {this.state.oScore}</h1>
          <h1 className="turn">Turn : {this.turn}</h1>
        </div>
        <div className="togglePlayer">
          <button className="x togglePlayerBtn" onClick={(event) => this.togglePlayer(event)} ref={(element) => {this.toggleButton = element;}}>{this.toggleButtonText}</button>
        </div>
        <div className="container">
          <div className="cell cell1 container-00" ref={(element) => {this.containers["container-00"] = element;}}>
            <div className="cell cell1 cell-00" onClick={(event) => this.selectCell(event, 0, "cell-00")} ref={(element) => {this.cell["cell-00"] = element;}}>
              {this.renderCell(0, "cell-00")}
            </div>
            <div className="cell cell2 cell-01" onClick={(event) => this.selectCell(event, 0, "cell-01")} ref={(element) => {this.cell["cell-01"] = element;}}>
              {this.renderCell(0, "cell-01")}
            </div>
            <div className="cell cell3 cell-02" onClick={(event) => this.selectCell(event, 0, "cell-02")} ref={(element) => {this.cell["cell-02"] = element;}}>
              {this.renderCell(0, "cell-02")}
            </div>
            <div className="cell cell4 cell-03" onClick={(event) => this.selectCell(event, 0, "cell-03")} ref={(element) => {this.cell["cell-03"] = element;}}>
              {this.renderCell(0, "cell-03")}
            </div>
            <div className="cell cell5 cell-04" onClick={(event) => this.selectCell(event, 0, "cell-04")} ref={(element) => {this.cell["cell-04"] = element;}}>
              {this.renderCell(0, "cell-04")}
            </div>
            <div className="cell cell6 cell-05" onClick={(event) => this.selectCell(event, 0, "cell-05")} ref={(element) => {this.cell["cell-05"] = element;}}>
              {this.renderCell(0, "cell-05")}
            </div>
            <div className="cell cell7 cell-06" onClick={(event) => this.selectCell(event, 0, "cell-06")} ref={(element) => {this.cell["cell-06"] = element;}}>
              {this.renderCell(0, "cell-06")}
            </div>
            <div className="cell cell8 cell-07" onClick={(event) => this.selectCell(event, 0, "cell-07")} ref={(element) => {this.cell["cell-07"] = element;}}>
              {this.renderCell(0, "cell-07")}
            </div>
            <div className="cell cell9 cell-08" onClick={(event) => this.selectCell(event, 0, "cell-08")} ref={(element) => {this.cell["cell-08"] = element;}}>
              {this.renderCell(0, "cell-08")}
            </div>
          </div>

          <div className="cell2 container-01" ref={(element) => {this.containers["container-01"] = element;}}>
            <div className="cell cell1 cell-09" onClick={(event) => this.selectCell(event, 1, "cell-09")} ref={(element) => {this.cell["cell-09"] = element;}}>
              {this.renderCell(1, "cell-09")}
            </div>
            <div className="cell cell2 cell-10" onClick={(event) => this.selectCell(event, 1, "cell-10")} ref={(element) => {this.cell["cell-10"] = element;}}>
              {this.renderCell(1, "cell-10")}
            </div>
            <div className="cell cell3 cell-11" onClick={(event) => this.selectCell(event, 1, "cell-11")} ref={(element) => {this.cell["cell-11"] = element;}}>
              {this.renderCell(1, "cell-11")}
            </div>
            <div className="cell cell4 cell-12" onClick={(event) => this.selectCell(event, 1, "cell-12")} ref={(element) => {this.cell["cell-12"] = element;}}>
              {this.renderCell(1, "cell-12")}
            </div>
            <div className="cell cell5 cell-13" onClick={(event) => this.selectCell(event, 1, "cell-13")} ref={(element) => {this.cell["cell-13"] = element;}}>
              {this.renderCell(1, "cell-13")}
            </div>
            <div className="cell cell6 cell-14" onClick={(event) => this.selectCell(event, 1, "cell-14")} ref={(element) => {this.cell["cell-14"] = element;}}>
              {this.renderCell(1, "cell-14")}
            </div>
            <div className="cell cell7 cell-15" onClick={(event) => this.selectCell(event, 1, "cell-15")} ref={(element) => {this.cell["cell-15"] = element;}}>
              {this.renderCell(1, "cell-15")}
            </div>
            <div className="cell cell8 cell-16" onClick={(event) => this.selectCell(event, 1, "cell-16")} ref={(element) => {this.cell["cell-16"] = element;}}>
              {this.renderCell(1, "cell-16")}
            </div>
            <div className="cell cell9 cell-17" onClick={(event) => this.selectCell(event, 1, "cell-17")} ref={(element) => {this.cell["cell-17"] = element;}}>
              {this.renderCell(1, "cell-17")}
            </div>
          </div>

          <div className="cell3 container-02" ref={(element) => {this.containers["container-02"] = element;}}>
            <div className="cell cell1 cell-18" onClick={(event) => this.selectCell(event, 2, "cell-18")} ref={(element) => {this.cell["cell-18"] = element;}}>
              {this.renderCell(2, "cell-18")}
            </div>
            <div className="cell cell2 cell-19" onClick={(event) => this.selectCell(event, 2, "cell-19")} ref={(element) => {this.cell["cell-19"] = element;}}>
              {this.renderCell(2, "cell-19")}
            </div>
            <div className="cell cell3 cell-20" onClick={(event) => this.selectCell(event, 2, "cell-20")} ref={(element) => {this.cell["cell-20"] = element;}}>
              {this.renderCell(2, "cell-20")}
            </div>
            <div className="cell cell4 cell-21" onClick={(event) => this.selectCell(event, 2, "cell-21")} ref={(element) => {this.cell["cell-21"] = element;}}>
              {this.renderCell(2, "cell-21")}
            </div>
            <div className="cell cell5 cell-22" onClick={(event) => this.selectCell(event, 2, "cell-22")} ref={(element) => {this.cell["cell-22"] = element;}}>
              {this.renderCell(2, "cell-22")}
            </div>
            <div className="cell cell6 cell-23" onClick={(event) => this.selectCell(event, 2, "cell-23")} ref={(element) => {this.cell["cell-23"] = element;}}>
              {this.renderCell(2, "cell-23")}
            </div>
            <div className="cell cell7 cell-24" onClick={(event) => this.selectCell(event, 2, "cell-24")} ref={(element) => {this.cell["cell-24"] = element;}}>
              {this.renderCell(2, "cell-24")}
            </div>
            <div className="cell cell8 cell-25" onClick={(event) => this.selectCell(event, 2, "cell-25")} ref={(element) => {this.cell["cell-25"] = element;}}>
              {this.renderCell(2, "cell-25")}
            </div>
            <div className="cell cell9 cell-26" onClick={(event) => this.selectCell(event, 2, "cell-26")} ref={(element) => {this.cell["cell-26"] = element;}}>
              {this.renderCell(2, "cell-26")}
            </div>
          </div>

          <div className="cell4 container-03" ref={(element) => {this.containers["container-03"] = element;}}>
            <div className="cell cell1 cell-27" onClick={(event) => this.selectCell(event, 3, "cell-27")} ref={(element) => {this.cell["cell-27"] = element;}}>
              {this.renderCell(3, "cell-27")}
            </div>
            <div className="cell cell2 cell-28" onClick={(event) => this.selectCell(event, 3, "cell-28")} ref={(element) => {this.cell["cell-28"] = element;}}>
              {this.renderCell(3, "cell-28")}
            </div>
            <div className="cell cell3 cell-29" onClick={(event) => this.selectCell(event, 3, "cell-29")} ref={(element) => {this.cell["cell-29"] = element;}}>
              {this.renderCell(3, "cell-29")}
            </div>
            <div className="cell cell4 cell-30" onClick={(event) => this.selectCell(event, 3, "cell-30")} ref={(element) => {this.cell["cell-30"] = element;}}>
              {this.renderCell(3, "cell-30")}
            </div>
            <div className="cell cell5 cell-31" onClick={(event) => this.selectCell(event, 3, "cell-31")} ref={(element) => {this.cell["cell-31"] = element;}}>
              {this.renderCell(3, "cell-31")}
            </div>
            <div className="cell cell6 cell-32" onClick={(event) => this.selectCell(event, 3, "cell-32")} ref={(element) => {this.cell["cell-32"] = element;}}>
              {this.renderCell(3, "cell-32")}
            </div>
            <div className="cell cell7 cell-33" onClick={(event) => this.selectCell(event, 3, "cell-33")} ref={(element) => {this.cell["cell-33"] = element;}}>
              {this.renderCell(3, "cell-33")}
            </div>
            <div className="cell cell8 cell-34" onClick={(event) => this.selectCell(event, 3, "cell-34")} ref={(element) => {this.cell["cell-34"] = element;}}>
              {this.renderCell(3, "cell-34")}
            </div>
            <div className="cell cell9 cell-35" onClick={(event) => this.selectCell(event, 3, "cell-35")} ref={(element) => {this.cell["cell-35"] = element;}}>
              {this.renderCell(3, "cell-35")}
            </div>
          </div>

          <div className="active cell5 container-04" ref={(element) => {this.containers["container-04"] = element;}}>
            <div className="cell cell1 cell-36" onClick={(event) => this.selectCell(event, 4, "cell-36")} ref={(element) => {this.cell["cell-36"] = element;}}>
              {this.renderCell(4, "cell-36")}
            </div>
            <div className="cell cell2 cell-37" onClick={(event) => this.selectCell(event, 4, "cell-37")} ref={(element) => {this.cell["cell-37"] = element;}}>
              {this.renderCell(4, "cell-37")}
            </div>
            <div className="cell cell3 cell-38" onClick={(event) => this.selectCell(event, 4, "cell-38")} ref={(element) => {this.cell["cell-38"] = element;}}>
              {this.renderCell(4, "cell-38")}
            </div>
            <div className="cell cell4 cell-39" onClick={(event) => this.selectCell(event, 4, "cell-39")} ref={(element) => {this.cell["cell-39"] = element;}}>
              {this.renderCell(4, "cell-39")}
            </div>
            <div className="cell cell5 cell-40" onClick={(event) => this.selectCell(event, 4, "cell-40")} ref={(element) => {this.cell["cell-40"] = element;}}>
              {this.renderCell(4, "cell-40")}
            </div>
            <div className="cell cell6 cell-41" onClick={(event) => this.selectCell(event, 4, "cell-41")} ref={(element) => {this.cell["cell-41"] = element;}}>
              {this.renderCell(4, "cell-41")}
            </div>
            <div className="cell cell7 cell-42" onClick={(event) => this.selectCell(event, 4, "cell-42")} ref={(element) => {this.cell["cell-42"] = element;}}>
              {this.renderCell(4, "cell-42")}
            </div>
            <div className="cell cell8 cell-43" onClick={(event) => this.selectCell(event, 4, "cell-43")} ref={(element) => {this.cell["cell-43"] = element;}}>
              {this.renderCell(4, "cell-43")}
            </div>
            <div className="cell cell9 cell-44" onClick={(event) => this.selectCell(event, 4, "cell-44")} ref={(element) => {this.cell["cell-44"] = element;}}>
              {this.renderCell(4, "cell-44")}
            </div>
          </div>

          <div className="cell6 container-05" ref={(element) => {this.containers["container-05"] = element;}}>
            <div className="cell cell1 cell-45" onClick={(event) => this.selectCell(event, 5, "cell-45")} ref={(element) => {this.cell["cell-45"] = element;}}>
              {this.renderCell(5, "cell-45")}
            </div>
            <div className="cell cell2 cell-46" onClick={(event) => this.selectCell(event, 5, "cell-46")} ref={(element) => {this.cell["cell-46"] = element;}}>
              {this.renderCell(5, "cell-46")}
            </div>
            <div className="cell cell3 cell-47" onClick={(event) => this.selectCell(event, 5, "cell-47")} ref={(element) => {this.cell["cell-47"] = element;}}>
              {this.renderCell(5, "cell-47")}
            </div>
            <div className="cell cell4 cell-48" onClick={(event) => this.selectCell(event, 5, "cell-48")} ref={(element) => {this.cell["cell-48"] = element;}}>
              {this.renderCell(5, "cell-48")}
            </div>
            <div className="cell cell5 cell-49" onClick={(event) => this.selectCell(event, 5, "cell-49")} ref={(element) => {this.cell["cell-49"] = element;}}>
              {this.renderCell(5, "cell-49")}
            </div>
            <div className="cell cell6 cell-50" onClick={(event) => this.selectCell(event, 5, "cell-50")} ref={(element) => {this.cell["cell-50"] = element;}}>
              {this.renderCell(5, "cell-50")}
            </div>
            <div className="cell cell7 cell-51" onClick={(event) => this.selectCell(event, 5, "cell-51")} ref={(element) => {this.cell["cell-51"] = element;}}>
              {this.renderCell(5, "cell-51")}
            </div>
            <div className="cell cell8 cell-52" onClick={(event) => this.selectCell(event, 5, "cell-52")} ref={(element) => {this.cell["cell-52"] = element;}}>
              {this.renderCell(5, "cell-52")}
            </div>
            <div className="cell cell9 cell-53" onClick={(event) => this.selectCell(event, 5, "cell-53")} ref={(element) => {this.cell["cell-53"] = element;}}>
              {this.renderCell(5, "cell-53")}
            </div>
          </div>

          <div className="cell7 container-06" ref={(element) => {this.containers["container-06"] = element;}}>
            <div className="cell cell1 cell-54" onClick={(event) => this.selectCell(event, 6, "cell-54")} ref={(element) => {this.cell["cell-54"] = element;}}>
              {this.renderCell(6, "cell-54")}
            </div>
            <div className="cell cell2 cell-55" onClick={(event) => this.selectCell(event, 6, "cell-55")} ref={(element) => {this.cell["cell-55"] = element;}}>
              {this.renderCell(6, "cell-55")}
            </div>
            <div className="cell cell3 cell-56" onClick={(event) => this.selectCell(event, 6, "cell-56")} ref={(element) => {this.cell["cell-56"] = element;}}>
              {this.renderCell(6, "cell-56")}
            </div>
            <div className="cell cell4 cell-57" onClick={(event) => this.selectCell(event, 6, "cell-57")} ref={(element) => {this.cell["cell-57"] = element;}}>
              {this.renderCell(6, "cell-57")}
            </div>
            <div className="cell cell5 cell-58" onClick={(event) => this.selectCell(event, 6, "cell-58")} ref={(element) => {this.cell["cell-58"] = element;}}>
              {this.renderCell(6, "cell-58")}
            </div>
            <div className="cell cell6 cell-59" onClick={(event) => this.selectCell(event, 6, "cell-59")} ref={(element) => {this.cell["cell-59"] = element;}}>
              {this.renderCell(6, "cell-59")}
            </div>
            <div className="cell cell7 cell-60" onClick={(event) => this.selectCell(event, 6, "cell-60")} ref={(element) => {this.cell["cell-60"] = element;}}>
              {this.renderCell(6, "cell-60")}
            </div>
            <div className="cell cell8 cell-61" onClick={(event) => this.selectCell(event, 6, "cell-61")} ref={(element) => {this.cell["cell-61"] = element;}}>
              {this.renderCell(6, "cell-61")}
            </div>
            <div className="cell cell9 cell-62" onClick={(event) => this.selectCell(event, 6, "cell-62")} ref={(element) => {this.cell["cell-62"] = element;}}>
              {this.renderCell(6, "cell-62")}
            </div>
          </div>

          <div className="cell8 container-07" ref={(element) => {this.containers["container-07"] = element;}}>
            <div className="cell cell1 cell-63" onClick={(event) => this.selectCell(event, 7, "cell-63")} ref={(element) => {this.cell["cell-63"] = element;}}>
              {this.renderCell(7, "cell-63")}
            </div>
            <div className="cell cell2 cell-64" onClick={(event) => this.selectCell(event, 7, "cell-64")} ref={(element) => {this.cell["cell-64"] = element;}}>
              {this.renderCell(7, "cell-64")}
            </div>
            <div className="cell cell3 cell-65" onClick={(event) => this.selectCell(event, 7, "cell-65")} ref={(element) => {this.cell["cell-65"] = element;}}>
              {this.renderCell(7, "cell-65")}
            </div>
            <div className="cell cell4 cell-66" onClick={(event) => this.selectCell(event, 7, "cell-66")} ref={(element) => {this.cell["cell-66"] = element;}}>
              {this.renderCell(7, "cell-66")}
            </div>
            <div className="cell cell5 cell-67" onClick={(event) => this.selectCell(event, 7, "cell-67")} ref={(element) => {this.cell["cell-67"] = element;}}>
              {this.renderCell(7, "cell-67")}
            </div>
            <div className="cell cell6 cell-68" onClick={(event) => this.selectCell(event, 7, "cell-68")} ref={(element) => {this.cell["cell-68"] = element;}}>
              {this.renderCell(7, "cell-68")}
            </div>
            <div className="cell cell7 cell-69" onClick={(event) => this.selectCell(event, 7, "cell-69")} ref={(element) => {this.cell["cell-69"] = element;}}>
              {this.renderCell(7, "cell-69")}
            </div>
            <div className="cell cell8 cell-70" onClick={(event) => this.selectCell(event, 7, "cell-70")} ref={(element) => {this.cell["cell-70"] = element;}}>
              {this.renderCell(7, "cell-70")}
            </div>
            <div className="cell cell9 cell-71" onClick={(event) => this.selectCell(event, 7, "cell-71")} ref={(element) => {this.cell["cell-71"] = element;}}>
              {this.renderCell(7, "cell-71")}
            </div>
          </div>

          <div className="cell9 container-08" ref={(element) => {this.containers["container-08"] = element;}}>
            <div className="cell cell1 cell-72" onClick={(event) => this.selectCell(event, 8, "cell-72")} ref={(element) => {this.cell["cell-72"] = element;}}>
              {this.renderCell(8, "cell-72")}
            </div>
            <div className="cell cell2 cell-73" onClick={(event) => this.selectCell(event, 8, "cell-73")} ref={(element) => {this.cell["cell-73"] = element;}}>
              {this.renderCell(8, "cell-73")}
            </div>
            <div className="cell cell3 cell-74" onClick={(event) => this.selectCell(event, 8, "cell-74")} ref={(element) => {this.cell["cell-74"] = element;}}>
              {this.renderCell(8, "cell-74")}
            </div>
            <div className="cell cell4 cell-75" onClick={(event) => this.selectCell(event, 8, "cell-75")} ref={(element) => {this.cell["cell-75"] = element;}}>
              {this.renderCell(8, "cell-75")}
            </div>
            <div className="cell cell5 cell-76" onClick={(event) => this.selectCell(event, 8, "cell-76")} ref={(element) => {this.cell["cell-76"] = element;}}>
              {this.renderCell(8, "cell-76")}
            </div>
            <div className="cell cell6 cell-77" onClick={(event) => this.selectCell(event, 8, "cell-77")} ref={(element) => {this.cell["cell-77"] = element;}}>
              {this.renderCell(8, "cell-77")}
            </div>
            <div className="cell cell7 cell-78" onClick={(event) => this.selectCell(event, 8, "cell-78")} ref={(element) => {this.cell["cell-78"] = element;}}>
              {this.renderCell(8, "cell-78")}
            </div>
            <div className="cell cell8 cell-79" onClick={(event) => this.selectCell(event, 8, "cell-79")} ref={(element) => {this.cell["cell-79"] = element;}}>
              {this.renderCell(8, "cell-79")}
            </div>
            <div className="cell cell9 cell-80" onClick={(event) => this.selectCell(event, 8, "cell-80")} ref={(element) => {this.cell["cell-80"] = element;}}>
              {this.renderCell(8, "cell-80")}
            </div>
          </div>
        </div>
        <div className="errorMsg">{this.state.errorMsg}</div>
        <div className="footer">
          <div className="footerText">&#169; <a href="https://raymondmutyaba.com/" className="copyrightText">Raymond Mutyaba</a> 2019</div>
        </div>
      </div>
    );
  }

}

export default Home;
