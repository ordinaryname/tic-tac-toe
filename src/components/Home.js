import React, { Component } from 'react';
import anime from 'animejs';

class Home extends Component {

  constructor() {
    super();
    this.state = {player: "x",};
    this.grid = [];
    this.cell = [];
    this.errorMsg = React.createRef();
  }

  componentDidUpdate() {
    this.anime();
  }

  componentDidMount() {
    this.anime();
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

  selectCell = (event, cellName) => {
    if(this.grid[cellName] === null || this.grid[cellName] === "") {
      this.grid[cellName] = this.state.player;
    } else if (this.grid[cellName] === "x" || this.grid[cellName] === "o") {
      //todo set error message
    }
  }

  render() {
    return(
      <div className="Home">
        <div className="container">
          <div className="cell cell-00" onClick={(event) => this.selectCell(event, "cell-00")} ref={(element) => {this.cell["cell-00"] = element;}}>
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-01">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-02">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-10">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-11">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-12">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-20">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-21">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div className="cell cell-22">
            <svg height="100" width="100">
              <circle cx="50" cy="50" r="50" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </div>
        </div>

        {/*
        <div className="square" ref={square => (this.square = square)}>
          <svg width="100" height="100">
            <rect width="100" height="100" fill="rgb(0,0,255)" />
            Sorry, your browser does not support inline SVG.
          </svg>
        </div>
        <div className="circle" ref={circle => (this.circle = circle)}>
          <svg height="100" width="100">
            <circle cx="50" cy="50" r="50" fill="red" />
            Sorry, your browser does not support inline SVG.
          </svg>
        </div>
        */}

        <div className="errorMsg" ref={(element) => {this.errorMsg = element;}}></div>
      </div>
    );
  }

}

export default Home;
