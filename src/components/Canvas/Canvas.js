import React, { useEffect } from "react";
import { useCanvas } from "./CanvasCtx";
import "./Canvas.css";

export function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      //onTouchStart={() => startDrawing()}
      //onTouchMove={() => draw()}
      //onTouchEnd={() => finishDrawing()}
      ref={canvasRef}
    />
  );
}
