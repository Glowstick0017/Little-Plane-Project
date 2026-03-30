const WS_URL = "wss://tlpp-mp.attaditya.space";
const multiplayerHandler = new MultiplayerHandler();

function connectMultiplayer() {
  const log = (...args) => console.log("[multiplayer]", ...args);
  const socket = new WebSocket(WS_URL);
  multiplayerHandler.connect(socket);
  
  socket.onopen = (event) => {
    log("Connected");
    multiplayerHandler.actions.joinRoom("lobby");
  };

  socket.onclose = (event) => {
    log("Disconnected");
    multiplayerHandler.disconnect();
  };

  socket.onerror = (error) => {
    log("Error:", error);
  };
  
  socket.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    multiplayerHandler.events[type]?.(data);
  };

  return socket;
}

