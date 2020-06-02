import React from "react";
import { connect } from "react-redux";

import Cell from "./Cell";

function mapStateToProps(state) {
  return {
    matrix: state.matrix
  };
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.matrix
    };
  }

  renderBoard = () => {
    let cells = [];
    this.state.board.forEach((val, coords, matrix) => {
      let x = coords[1];
      let y = coords[0];
      cells.push(<Cell xCoord={x} yCoord={y} key={`${x}-${y}`} />);
    });
    return cells;
  };

  render() {
    return <div className="Board">{this.renderBoard()}</div>;
  }
}

export default connect(mapStateToProps)(Board);
