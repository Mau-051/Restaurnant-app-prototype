import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    let canvasSize = 3;
    canvas.width = window.innerWidth * canvasSize;
    canvas.height = window.innerHeight * canvasSize;
    canvas.style.width = `${window.innerWidth * canvasSize}px`;
    canvas.style.height = `${window.innerHeight * canvasSize}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  function roundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x, y + radius);
    context.arcTo(x, y + height, x + radius, y + height, radius);
    context.arcTo(
      x + width,
      y + height,
      x + width,
      y + height - radius,
      radius
    );
    context.arcTo(x + width, y, x + width - radius, y, radius);
    context.arcTo(x, y, x, y + radius, radius);
    context.stroke();
  }

  const drawPacMan = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    roundedRect(context, 12, 12, 150, 150, 15);
    roundedRect(context, 19, 19, 150, 150, 9);
    roundedRect(context, 53, 53, 49, 33, 10);
    roundedRect(context, 53, 119, 49, 16, 6);
    roundedRect(context, 135, 53, 49, 33, 10);
    roundedRect(context, 135, 119, 25, 49, 10);

    context.beginPath();
    context.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    context.lineTo(31, 37);
    context.fill();

    for (let i = 0; i < 8; i++) {
      context.fillRect(51 + i * 16, 35, 4, 4);
    }

    for (let i = 0; i < 6; i++) {
      context.fillRect(115, 51 + i * 16, 4, 4);
    }

    for (let i = 0; i < 8; i++) {
      context.fillRect(51 + i * 16, 99, 4, 4);
    }

    context.beginPath();
    context.moveTo(83, 116);
    context.lineTo(83, 102);
    context.bezierCurveTo(83, 94, 89, 88, 97, 88);
    context.bezierCurveTo(105, 88, 111, 94, 111, 102);
    context.lineTo(111, 116);
    context.lineTo(106.333, 111.333);
    context.lineTo(101.666, 116);
    context.lineTo(97, 111.333);
    context.lineTo(92.333, 116);
    context.lineTo(87.666, 111.333);
    context.lineTo(83, 116);
    context.fill();

    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(91, 96);
    context.bezierCurveTo(88, 96, 87, 99, 87, 101);
    context.bezierCurveTo(87, 103, 88, 106, 91, 106);
    context.bezierCurveTo(94, 106, 95, 103, 95, 101);
    context.bezierCurveTo(95, 99, 94, 96, 91, 96);
    context.moveTo(103, 96);
    context.bezierCurveTo(100, 96, 99, 99, 99, 101);
    context.bezierCurveTo(99, 103, 100, 106, 103, 106);
    context.bezierCurveTo(106, 106, 107, 103, 107, 101);
    context.bezierCurveTo(107, 99, 106, 96, 103, 96);
    context.fill();

    context.fillStyle = "black";
    context.beginPath();
    context.arc(101, 102, 2, 0, Math.PI * 2, true);
    context.fill();

    context.beginPath();
    context.arc(89, 102, 2, 0, Math.PI * 2, true);
    context.fill();
  };

  //mouse drawing control

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  //touch drawing control
  const ongoingTouches = [];

  const handleStart = (evt) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
      const color = colorForTouch(touches[i]);

      context.beginPath();
      context.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    }
  };

  const handleMove = (evt) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      const color = colorForTouch(touches[i]);
      const idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        context.beginPath();

        context.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);

        context.lineTo(touches[i].pageX, touches[i].pageY);
        context.lineWidth = 4;
        context.strokeStyle = color;
        context.stroke();

        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
      } else {
      }
    }
  };

  const handleEnd = (evt) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      const color = colorForTouch(touches[i]);
      let idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        context.lineWidth = 4;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        context.lineTo(touches[i].pageX, touches[i].pageY);
        context.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);
        ongoingTouches.splice(idx, 1);
      } else {
        console.log("can't figure out which touch to end");
      }
    }
  };

  const handleCancel = (evt) => {
    const touches = evt.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      let idx = ongoingTouchIndexById(touches[i].identifier);
      ongoingTouches.splice(idx, 1);
    }
  };

  const colorForTouch = (touch) => {
    let r = touch.identifier % 16;
    let g = Math.floor(touch.identifier / 3) % 16;
    let b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    const color = `#${r}${g}${b}`;
    return color;
  };

  const copyTouch = ({ identifier, pageX, pageY }) => {
    return { identifier, pageX, pageY };
  };

  const ongoingTouchIndexById = (idToFind) => {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;

      if (id === idToFind) {
        return i;
      }
    }
    return -1;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        drawPacMan,
        startDrawing,
        finishDrawing,
        handleStart,
        handleMove,
        handleCancel,
        handleEnd,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
