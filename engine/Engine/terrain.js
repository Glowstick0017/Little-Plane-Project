function Terrain(
  updateCoordinatesDisplay,
  updateAltimeterDisplay,
  getTerrainColor,
  getPerlinValue,
  applySeed,
  MOUNTAIN_HEIGHT,
  CANVAS_DIMENSIONS,
  QUALITY,
  ALTIUDE_FACTOR,
  MIN_ALTITUDE,
  MAX_ALTITUDE,
  DEFAULT_ALTITUDE
) {
  const pos = PositionSystem(0, 0);
  let altitude = DEFAULT_ALTITUDE;
  let seed = 0;

  const terrain_canvas = document.createElement('canvas');
  terrain_canvas.width = CANVAS_DIMENSIONS.width;
  terrain_canvas.height = CANVAS_DIMENSIONS.height;
  const terrain_ctx = terrain_canvas.getContext("2d");

  function refreshCoordinate() {
    const coordFactor = ALTIUDE_FACTOR / (altitude * 10);

    const pX = Math.round(pos.getX() / coordFactor);
    const pY = Math.round(pos.getY() / -coordFactor);

    updateCoordinatesDisplay(`Coordinates: X=${pX}, Y=${pY}`);
  }

  function calculateSeaLevel(x, y) {
    let camHeight = altitude / ALTIUDE_FACTOR;
    
    let {
      x: adjustedX,
      y: adjustedY,
    } = adjustedPositions(
      pos.getX(),
      pos.getY(),
    );

    return (
      (
        getPerlinValue(
          (x + adjustedX) * camHeight,
          (y + adjustedY) * camHeight
        ) + MOUNTAIN_HEIGHT
      ) / 2
    );
  }

  function drawTerrain() {
    const drawing_batch = new Map();

    for (
      let x = -QUALITY;
      x < CANVAS_DIMENSIONS.width + QUALITY;
      x += QUALITY
    ) {
      let last_color = "";

      for (
        let y = -QUALITY;
        y < height + QUALITY;
        y += QUALITY
      ) {
        const seaLevel = calculateSeaLevel(x, y);
        const color = getTerrainColor(seaLevel);

        if (!drawing_batch.get(color)) {
          drawing_batch.set(color, [])
        }

        if (last_color === color) {
          const to_increase = drawing_batch.get(color).pop()
          drawing_batch.get(color).push({
            ...to_increase,
            delta_y: to_increase.delta_y + QUALITY
          })
        } else {
          drawing_batch.get(color).push({
            x, y, delta_x: QUALITY, delta_y: QUALITY
          })
        }

        last_color = color
      }
    }

    const drawOffsetX = (pos.getX() + QUALITY / 2) % QUALITY;
    const drawOffsetY = (pos.getY() + QUALITY / 2) % QUALITY;

    for (let [color, squares] of drawing_batch) {
      terrain_ctx.fillStyle = color;
      for (let square of squares) {
        terrain_ctx.fillRect(
          square.x - drawOffsetX,
          square.y - drawOffsetY,
          square.delta_x,
          square.delta_y
        );
      }
    }
  }


  function updatePosX(updatedX) {
    pos.setX(updatedX);
    refreshCoordinate();
  }

  function updatePosY(updatedY) {
    pos.setY(updatedY);
    refreshCoordinate();
  }

  function applyOnX(applyFn) {
    pos.applyOnX(applyFn);
    refreshCoordinate();
  }

  function applyOnY(applyFn) {
    pos.applyOnY(applyFn);
    refreshCoordinate();
  }

  function updateZoom(dAltitude) {
    let oldAlt = altitude;
    
    altitude += dAltitude;
    altitude = clamp(
        altitude,
        MIN_ALTITUDE,
        MAX_ALTITUDE,
    );

    let newCamHeight = altitude;
    let camHeightRatio = newCamHeight / oldAlt;

    applyOnX(x => x / camHeightRatio);
    applyOnY(y => y / camHeightRatio);

    updateAltimeterDisplay(altitude);
  }

  function setSeed(updatedSeed) {
    seed = updatedSeed;
  }

  function getTerrainCanvas() {
    applySeed(seed);
    drawTerrain();
    return terrain_canvas;
  }
  
  return {
    updatePosX,
    updatePosY,
    applyOnX,
    applyOnY,
    updateZoom,
    setSeed,
    getTerrainCanvas,
  };
}

