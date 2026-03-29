function createMultiplayerPlane(planeId) {
  const plane = new Plane();
  const planeCanvas = document.createElement("canvas");
  const canvasContainer = document.getElementById("canvas-container");
  
  planeCanvas.classList.add("mpPlaneCanvas");
  canvasContainer.appendChild(planeCanvas);

  plane.setDom({
    canvas: planeCanvas,
  });

  plane.initGraphics();
  plane.updateState();

  planeManager.planes[planeId] = plane;
}

function joinRoom({ roomId, seed, time, self, players }, callbacks=[]) {
  console.log("[multiplayer]", `Joined room: ${roomId}`);
  console.log("[multiplayer]", `Room seed: ${seed}`);
  console.log("[multiplayer]", `Your player ID: ${self.id}`);
  
  terrain.setSeed(HashToNumber(SHA256(seed)));
  cloud.setSeed(HashToNumber(SHA256((seed + 200) + "")));
  
  timeCycle.setTime(time);
  cloud.updateEpoch(time);

  engine.updateX(0);
  engine.updateY(0);
  
  $result.value = "seed set to `" + seed + "`";
  $seed.innerHTML = "Seed: " + seed;

  for (let player of players) {
    if (player.id === self.id) continue;
    createMultiplayerPlane(player.id);
  }

  callbacks.forEach(cb => cb());
}

function playerJoined({ player }, callbacks=[]) {
  console.log("[multiplayer]", "Player joined:", player.id);
  createMultiplayerPlane(player.id);
  callbacks.forEach(cb => cb());
}

function playerLeft({ playerId }, callbacks=[]) {
  console.log("[multiplayer]", "Player left:", playerId);
  if (!planeManager.planes[playerId]) return;
  
  planeManager.planes[playerId].domElements.canvas.remove();
  delete planeManager.planes[playerId];
  callbacks.forEach(cb => cb());
}

function planeState({ playerId, state }, callbacks=[]) {
  const plane = planeManager.planes[playerId];
  if (!plane) return;

  plane.control = state;
  callbacks.forEach(cb => cb());
}

const MP_EVENTS = {
  joinRoom,
  playerJoined,
  playerLeft,
  planeState,
};

