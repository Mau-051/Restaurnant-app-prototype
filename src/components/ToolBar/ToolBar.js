import React from "react";
import "./ToolBar.css";

export function ToolBar() {
  return (
    <ul className="top-toolbar">
      <li className="top-toolbar-li">
        <button>Home</button>
      </li>
      <li className="top-toolbar-li">
        <button>Edit layout</button>
      </li>
      <li className="top-toolbar-li">
        <button>Add furniture</button>
      </li>
    </ul>
  );
}
