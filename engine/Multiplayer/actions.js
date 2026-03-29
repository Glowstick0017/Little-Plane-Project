function sendData(socket, type, data) {
  if (socket.readyState !== WebSocket.OPEN)
    return false;

  const message = { type, data };
  socket.send(JSON.stringify(message));

  return true;
}

function joinRoom(socket, roomId) {
  sendData(socket, "joinRoom", { roomId });
}

function sendPlaneState(socket) {
  const pos = engine.getPosition();
  const state = {
    angle: plane.angle || 0,
    speed: speed * !!constantFlight * !pause,
    lastUpdateTimestamp: Date.now(),
    altitude: pos.altitude || 0,
    position: {
      startX: pos.x || 0,
      startY: pos.y || 0,
    },
  };

  sendData(socket, "planeState", { state });
}

const MP_ACTIONS = {
  joinRoom,
  sendPlaneState,
};
