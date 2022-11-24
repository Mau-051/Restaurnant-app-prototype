import "./SubToolBar.css";

import React, { useRef } from "react";
import { useCanvas } from "../../Canvas/CanvasCtx";

export function SubToolBar() {
  const { drawPacMan, clearCanvas, disableDraw } = useCanvas();

  const toggleRef = useRef(null);

  return (
    <ul className="sub-toolbar">
      <li className="sub-toolbar-li">
        <button>Select costumer</button>
      </li>
      <li className="sub-toolbar-li">
        <button>Take order</button>
      </li>
      <li className="sub-toolbar-li">
        <button>Split account</button>
      </li>
      <li className="sub-toolbar-li">
        <button onClick={drawPacMan}>Draw pacMan</button>
      </li>
      <li className="sub-toolbar-li">
        <button onClick={clearCanvas}>Clear canvas</button>
      </li>
      <li className="sub-toolbar-li">
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => disableDraw(toggleRef.current.checked)}
            ref={toggleRef}
          />
          <span className="slider round"></span>
          <p id="toggle-text">draw | move</p>
        </label>
      </li>
    </ul>
  );
}
