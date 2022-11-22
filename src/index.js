import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CanvasProvider } from "./components/Canvas/CanvasCtx";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>
);

reportWebVitals();
