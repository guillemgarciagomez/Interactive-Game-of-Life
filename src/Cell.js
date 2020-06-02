import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    matrix: state.matrix
  };
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alive: false
    };
  }

  shouldComponentUpdate(nextProps) {
    let isAlive =
      nextProps.matrix._data[nextProps.yCoord][nextProps.xCoord] === 1;
    return this.state.alive !== isAlive;
  }

  componentDidUpdate() {
    let isAlive =
      this.props.matrix._data[this.props.yCoord][this.props.xCoord] === 1;
    if (this.state.alive !== isAlive) {
      this.setState({
        alive: isAlive
      });
    }
  }

  toggleCell = (x, y, alive) => {
    let action = alive ? "KILL" : "GIVE_LIFE";
    this.props.dispatch({
      type: action,
      xCoord: x,
      yCoord: y
    });
    //this.setState({ alive: !alive });
  };

  renderCell = () => {
    let x = this.props.xCoord;
    let y = this.props.yCoord;
    let alive = this.state.alive;
    return (
      <div
        className={alive ? "onCell" : "offCell"}
        onClick={() => this.toggleCell(x, y, alive)}
      />
    );
  };

  render() {
    return this.renderCell();
  }
}

export default connect(mapStateToProps)(Cell);
