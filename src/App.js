import { ToolBar } from "./components/ToolBar/ToolBar";
import { Canvas } from "./components/Canvas/Canvas";
import { SubToolBar } from "./components/ToolBar/SubToolBar/SubToolBar";
import "./App.css";

function App() {
  return (
    <>
      <ToolBar />
      <SubToolBar />
      <Canvas />
    </>
  );
}

// toolbar on position default
//subToolBar position absolute
//canvas on position fixed

export default App;
