import React from "react";

import Board from "./Board";
import Drawer from "./Drawer";

export default function BoardAndDrawer() {
  return (
    <div className="BoardAndDrawer">
      <Drawer />
      <Board />
    </div>
  );
}
