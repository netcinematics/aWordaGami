import React, { Component } from 'react';


class TokenFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false, };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() { this.setState({ isHovered: true }); }
  handleMouseLeave() { this.setState({ isHovered: false }); }
  render() {
    return (
      <button
        className={this.state.isHovered ? 'hovered-button' : ''}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        A...
      </button>
    );
  }
}

export default TokenFrame;