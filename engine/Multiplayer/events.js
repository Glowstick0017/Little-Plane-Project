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

function connectionSuccess({ status, self }) {
  if (status === "success") {
    console.log("[multiplayer]", `Your player ID: ${self.id}`);
    return;
  }  
  
  console.error("[multiplayer]", "Connection Status:", status);
}

function joinRoom({ roomId, seed, time, self, players }) {
  console.log("[multiplayer]", `Joined room: ${roomId}`);
  console.log("[multiplayer]", `Room seed: ${seed}`);
  
  terrain.setSeed(HashToNumber(SHA256(seed)));
  cloud.setSeed(HashToNumber(SHA256((seed + 200) + "")));
  
  timeCycle.setTime(time);
  cloud.updateEpoch(time);

  engine.updateX(0);
  engine.updateY(0);
  
  $seed.innerHTML = "Seed: " + seed;
  $result.value = [
    `Joined room "${roomId}"`,
    "Room seed: " + seed,
    "Players in room: " + players.length,
  ].join("\n");

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
  
  planeManager.planes[playerId].domElements.canvas.remove();
  delete planeManager.planes[playerId];
}

function planeState({ playerId, state }) {
  const plane = planeManager.planes[playerId];
  if (!plane) return;

  plane.control = state;
}

function bindCallbacks(fn) {
  return (...args) => {
    const callbacks = args.pop();
    fn(...args);
    callbacks.forEach(callb => callb());
  };
}

const MP_EVENTS = {
  connectionSuccess: bindCallbacks(connectionSuccess),
  joinRoom: bindCallbacks(joinRoom),
  playerJoined: bindCallbacks(playerJoined),
  playerLeft: bindCallbacks(playerLeft),
  planeState: bindCallbacks(planeState),
};

