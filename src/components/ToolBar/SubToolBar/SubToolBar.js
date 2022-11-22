import "./SubToolBar.css";

import React from "react";
import { useCanvas } from "../../Canvas/CanvasCtx";

export function SubToolBar() {
  const { drawPacMan } = useCanvas();
  return (
    <ul className="sub-toolbar">
      <li className="sub-toolbar-li">
        <button>Select costumer</button>
      </li>
      <li className="sub-toolbar-li">
        <button>take order</button>
      </li>
      <li className="sub-toolbar-li">
        <button>split account</button>
      </li>
      <li className="sub-toolbar-li">
        <button
          onClick={() => {
            drawPacMan();
          }}
        >
          draw pacMan
        </button>
      </li>
    </ul>
  );
}
