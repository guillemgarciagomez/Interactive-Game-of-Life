import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { zeros, matrix } from "mathjs";

import "./styles.css";

import Interface from "./Interface";

const ROWS = 50;
const COLUMNS = 50;

const initialState = {
  matrix: zeros(ROWS, COLUMNS)
};

function reducer(state = initialState, action) {
  console.log("reducer", state, action);
  switch (action.type) {
    case "KILL":
      let tempMatrixK = Object.assign(matrix(), state.matrix);
      tempMatrixK._data[action.yCoord][action.xCoord] = 0;
      return {
        matrix: tempMatrixK
      };

    case "GIVE_LIFE":
      let tempMatrixL = Object.assign(matrix(), state.matrix);
      tempMatrixL._data[action.yCoord][action.xCoord] = 1;
      return {
        matrix: tempMatrixL
      };

    case "GAME_STEP":
      let tempMatrixKB = Object.assign(matrix(), state.matrix);
      for (let cellToKill of action.cellsToKill) {
        tempMatrixKB._data[cellToKill.y][cellToKill.x] = 0;
      }
      for (let cellToGiveLife of action.cellsToGiveLife) {
        tempMatrixKB._data[cellToGiveLife.y][cellToGiveLife.x] = 1;
      }
      return {
        matrix: tempMatrixKB
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Interface />
    </Provider>
  </React.StrictMode>,
  rootElement
);
