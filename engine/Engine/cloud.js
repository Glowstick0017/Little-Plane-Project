function Cloud(
  getPerlinValue,
  applySeed,
  CANVAS_DIMENSIONS,
  QUALITY,
  ALTIUDE_FACTOR,
  MIN_ALTITUDE,
  MAX_ALTITUDE,
  CLOUD_HEIGHT
) {
  const pos = PositionSystem(0, 0);
  let altitude = MIN_ALTITUDE - CLOUD_HEIGHT;
  let seed = 0;

  let cloudSpeedX = 2 * Math.random();
  let cloudSpeedY = 2 * Math.random();
  
  // Frame-rate independent cloud movement
  let lastCloudUpdate = performance.now();
  
  let cloudTransitionStart = 100;
  let cloudTransitionEnd = 150;

  let cloud_canvas = document.createElement('canvas');
  cloud_canvas.width = CANVAS_DIMENSIONS.width;
  cloud_canvas.height = CANVAS_DIMENSIONS.height;
  let cloud_ctx = cloud_canvas.getContext("2d");

  function calculateCloudDensity(x, y) {
    let camHeight = altitude / ALTIUDE_FACTOR;
    let {
      x: adjustedX,
      y: adjustedY,
    } = adjustedPositions(
      pos.getX(),
      pos.getY(),
    );

    let noise = getPerlinValue(
      (x + adjustedX) * camHeight,
      (y + adjustedY) * camHeight
    );

    let adjustedNoise = (1 + noise) / 2;
    if (adjustedNoise < 0.6) adjustedNoise = 0;
    
    let visibilityFactor = 0;
    
    if (altitude < 0) {
      visibilityFactor = 0;
    } else if (altitude < cloudTransitionStart) {
      visibilityFactor = altitude;
      visibilityFactor /= cloudTransitionStart;
    } else if (altitude < cloudTransitionEnd) {
      visibilityFactor = altitude;
      visibilityFactor -= cloudTransitionStart;
      visibilityFactor /= cloudTransitionEnd - cloudTransitionStart;
      visibilityFactor = 2 - visibilityFactor;
      visibilityFactor = Math.min(visibilityFactor, 1);
    } else {
      visibilityFactor = 1;
    }
    
    adjustedNoise *= visibilityFactor;
    return adjustedNoise;
  }

  function drawClouds() {
    if (altitude < 0) return;

    const drawOffsetX = (pos.getX() + QUALITY / 2) % QUALITY;
    const drawOffsetY = (pos.getY() + QUALITY / 2) % QUALITY;

    cloud_ctx.clearRect(
      0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height
    );

    for (
      let x = -QUALITY;
      x < CANVAS_DIMENSIONS.width + QUALITY;
      x += QUALITY
    ) {
      for (
        let y = -QUALITY;
        y < CANVAS_DIMENSIONS.height + QUALITY;
        y += QUALITY
      ) {
        let density = calculateCloudDensity(x, y);
        density *= [
          calculateCloudDensity(x + 1, y),
          calculateCloudDensity(x - 1, y),
          calculateCloudDensity(x, y + 1),
          calculateCloudDensity(x, y - 1)
        ].reduce((d1, d2) => d1 + d2, 0) / 4;
        
        if (density === 0) continue;
        cloud_ctx.fillStyle = `rgba(255, 255, 255, ${density})`;
        cloud_ctx.fillRect(
          x - drawOffsetX,
          y - drawOffsetY,
          QUALITY,
          QUALITY
        );
      }
    }
  }

  function updatePosX(updatedX) {
    pos.setX(updatedX);
  }

  function updatePosY(updatedY) {
    pos.setY(updatedY);
  }

  function applyOnX(applyFn) {
    pos.applyOnX(applyFn);
  }

  function applyOnY(applyFn) {
    pos.applyOnY(applyFn);
  }

  function updateZoom(dAltitude) {
    let oldAlt = altitude;
    
    altitude += dAltitude;
    altitude = clamp(
        altitude,
        MIN_ALTITUDE - CLOUD_HEIGHT,
        MAX_ALTITUDE - CLOUD_HEIGHT,
    );

    let newCamHeight = altitude;
    let camHeightRatio = Math.abs(newCamHeight / oldAlt);

    if (isNaN(camHeightRatio)) return;
    if (!isFinite(camHeightRatio)) return;
    if (camHeightRatio === 0) return;

    applyOnX(x => x / camHeightRatio);
    applyOnY(y => y / camHeightRatio);
  }

  function setSeed(updatedSeed) {
    seed = updatedSeed;
  }

  function moveCloud(currentTime) {
    // Initialize timestamp on first call
    if (!currentTime) {
      lastCloudUpdate = performance.now();
      requestAnimationFrame(moveCloud);
      return;
    }
    
    // Calculate delta time for frame-rate independent movement
    const deltaTime = (currentTime - lastCloudUpdate) / 1000;
    lastCloudUpdate = currentTime;
    
    // Cap delta time to avoid huge jumps
    const cappedDelta = Math.min(deltaTime, 0.1);
    
    // Normalize cloud movement to 60 FPS equivalent
    const normalizedMovement = cappedDelta * 60;
    
    applyOnX(x => x + cloudSpeedX * normalizedMovement);
    applyOnY(y => y + cloudSpeedY * normalizedMovement);
    requestAnimationFrame(moveCloud);
  }

  function getCloudCanvas() {
    applySeed(seed);
    drawClouds();
    return cloud_canvas;
  }

  return {
    updatePosX,
    updatePosY,
    applyOnX,
    applyOnY,
    moveCloud,
    updateZoom,
    setSeed,
    getCloudCanvas,
  }
}

