function createMultiplayerPlane(planeId) {
  const plane = new Plane();
  const planeCanvas = document.createElement("canvas");
  const canvasContainer = document.getElementById("mpPlayerCanvases");
  
  planeCanvas.classList.add("mpPlaneCanvas");
  canvasContainer.appendChild(planeCanvas);

  plane.setDom({
    canvas: planeCanvas,
  });

  plane.initGraphics();
  plane.updateState();

  planeManager.planes[planeId] = plane;
}

function joinRoom({ roomId, seed, self, players }) {
  console.log("[multiplayer]", `Joined room: ${roomId}`);
  console.log("[multiplayer]", `Room seed: ${seed}`);
  console.log("[multiplayer]", `Your player ID: ${self.id}`);
  
  terrain.setSeed(HashToNumber(SHA256(seed)));
  engine.updateX(0);
  engine.updateY(0);
  
  $result.value = "seed set to `" + seed + "`";
  $seed.innerHTML = "Seed: " + seed;

  for (let player of players) {
    if (player.id === self.id) continue;
    createMultiplayerPlane(player.id);
  }
}

function playerJoined({ player }) {
  console.log("[multiplayer]", "Player joined:", player.id);
  createMultiplayerPlane(player.id);
}

function playerLeft({ playerId }) {
  console.log("[multiplayer]", "Player left:", playerId);
  if (!planeManager.planes[playerId]) return;
  delete planeManager.planes[playerId];
}

function planeState({ playerId, state }) {
  const plane = planeManager.planes[playerId];
  if (!plane) return;

  plane.control.angle = state.angle;
  plane.control.position = state.position;
  plane.control.altitude.value = state.altitude;
}

const MP_EVENTS = {
  joinRoom,
  playerJoined,
  playerLeft,
  planeState,
};

