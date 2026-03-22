function sendData(socket, type, data) {
  if (socket.readyState !== WebSocket.OPEN)
    return false;

  const message = { type, data };
  socket.send(JSON.stringify(message));

  return true;
}

function joinRoom(roomId) {
  sendData(socket, "joinRoom", { roomId });
}

function sendPlaneState(socket) {
  if (socket.readyState !== WebSocket.OPEN)
    return;

  const state = {
    angle: plane.angle || 0,
    position: { ...engine.getPosition() },
    altitude: plane.shadowHeight || 0,
  };

  const sent = sendData(socket, "planeState", { state });
  if (sent)
    requestAnimationFrame(() => sendPlaneState(socket));
}

const MP_ACTIONS = {
  joinRoom,
  sendPlaneState,
};
