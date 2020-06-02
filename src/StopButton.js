import React, { useEffect } from "react";
import { connect } from "react-redux";

const StopButton = props => {
  useEffect(() => {
    const timer = setTimeout(() => props.gameStep(), 500);
    return () => clearTimeout(timer);
  });

  return <button className={`button stopButton`}>STOP</button>;
};

const mapStateToProps = state => {
  return {
    matrix: state.matrix
  };
};

export default connect(mapStateToProps)(StopButton);
