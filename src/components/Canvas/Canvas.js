import React, { useEffect } from "react";
import { useCanvas } from "./CanvasCtx";
import "./Canvas.css";

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    draw,
    finishDrawing,
    handleStart,
    handleMove,
    handleCancel,
    handleEnd,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      //mouse drawing control
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      //thouch drawing control
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchCancel={handleCancel}
      onTouchEnd={handleEnd}
    />
  );
}
