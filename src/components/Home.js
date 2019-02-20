import React, { Component } from 'react';
import anime from 'animejs';

class Home extends Component {

  constructor() {
    super();
    this.state = {grid: [],};
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

  render() {
    return(
      <div className="Home">
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
      </div>
    );
  }

}

export default Home;
