function PositionSystem(initialX, initialY) {
  let posX = initialX;
  let posY = initialY;

  return {
    getX: () => posX,
    getY: () => posY,
    setX: (updatedX) => posX = updatedX,
    setY: (updatedY) => posY = updatedY,
    applyOnX: (applyFn) => posX = applyFn(posX),
    applyOnY: (applyFn) => posY = applyFn(posY),
  };
}

function cameraHeight(altitude) {
  return altitude / altitudeFactor;
}

function adjustedPositions(xVal, yVal) {
  let adjustedX = Math.round(xVal / quality) * quality - (width / 2);
  let adjustedY = Math.round(yVal / quality) * quality - (height / 2);

  return {
    x: adjustedX,
    y: adjustedY
  }
}

