import React, { useEffect } from "react";
import { useCanvas } from "./CanvasCtx";
import "./Canvas.css";

export function Canvas() {
  useGesture();

  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
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
      //mouse drawing control
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      //thouch drawing control
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchCancel={handleCancel}
      onTouchEnd={handleEnd}
      ref={canvasRef}
    />
  );
}
