import React, { Component } from "react";
import { connect } from "react-redux";

import StopButton from "./StopButton";

function mapStateToProps(state) {
  return {
    matrix: state.matrix
  };
}

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false
    };
  }

  gameStep = () => {
    let cellsToKill = [];
    let cellsToGiveLife = [];
    this.props.matrix.forEach((val, coords, matrix) => {
      let sumNeighbors = this.countAliveNeighbors(...coords);
      if (val === 1) {
        if (sumNeighbors < 2 || sumNeighbors > 3) {
          cellsToKill.push({ x: coords[1], y: coords[0] });
        }
      } else {
        if (sumNeighbors === 3) {
          cellsToGiveLife.push({ x: coords[1], y: coords[0] });
        }
      }
    });

    this.props.dispatch({
      type: "GAME_STEP",
      cellsToKill: cellsToKill,
      cellsToGiveLife: cellsToGiveLife
    });
  };

  countAliveNeighbors(y, x) {
    let count = 0;
    let neighbors = [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 }
    ];
    for (let neighbor of neighbors) {
      if (neighbor.x < 0) {
        neighbor.x = 50 - 1;
      } else if (neighbor.x > 50 - 1) {
        neighbor.x = 0;
      }
      if (neighbor.y < 0) {
        neighbor.y = 50 - 1;
      } else if (neighbor.y > 50 - 1) {
        neighbor.y = 0;
      }
      count += this.props.matrix._data[neighbor.y][neighbor.x];
    }
    return count;
  }

  clearBoard = () => {
    let cellsToKill = [];
    this.props.matrix.forEach((val, coords, matrix) => {
      if (val === 1) {
        cellsToKill.push({ x: coords[1], y: coords[0] });
      }
    });

    this.props.dispatch({
      type: "GAME_STEP",
      cellsToKill: cellsToKill,
      cellsToGiveLife: []
    });
  };

  gameRunStop = () => {
    if (this.state.running) {
      this.setState({ running: false });
    } else {
      this.setState({ running: true });
    }
  };

  render() {
    return (
      <div className="Drawer">
        <div onClick={this.gameRunStop} className={"buttonWrapper"}>
          {this.state.running ? (
            <StopButton gameStep={this.gameStep} />
          ) : (
            <button className={"button goButton"}>GO</button>
          )}
        </div>
        <button
          className={`button ${this.state.running ? "disabled" : "stepButton"}`}
          onClick={() => this.gameStep()}
        >
          STEP
        </button>
        <button
          className={`button ${
            this.state.running ? "disabled" : "clearButton"
          }`}
          onClick={() => this.clearBoard()}
        >
          CLEAR
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Drawer);
