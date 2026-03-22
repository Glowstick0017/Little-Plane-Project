function connectMultiplayer() {
  const socket = new WebSocket("ws://localhost:3100");
  const log = (...args) => console.log("[multiplayer]", ...args);
  
  socket.onopen = (event) => {
    log("Connected");
    
    MP_ACTIONS.joinRoom(12345);
    MP_ACTIONS.sendPlaneState(socket);
  };

  socket.onclose = (event) => {
    log("Disconnected");
  };

  socket.onerror = (error) => {
    log("Error:", error);
  };
  
  socket.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    MP_EVENTS[type]?.(data);
  };

  return socket;
}

window.socket = connectMultiplayer();

