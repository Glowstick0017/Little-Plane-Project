function Engine(
  terrainInstance,
  cloudInstance,
) {
  function updateX(updatedX) {
    terrainInstance.updatePosX(updatedX);
    cloudInstance.updatePosX(updatedX);
  }
  
  function updateY(updatedY) {
    terrainInstance.updatePosY(updatedY);
    cloudInstance.updatePosY(updatedY);
  }
  
  function applyOnX(applyFn) {
    terrainInstance.applyOnX(applyFn);
    cloudInstance.applyOnX(applyFn);
  }

  function applyOnY(applyFn) {
    terrainInstance.applyOnY(applyFn);
    cloudInstance.applyOnY(applyFn);
  }

  function updateZoom(dAltitude) {
    terrainInstance.updateZoom(dAltitude);
    cloudInstance.updateZoom(dAltitude);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(terrain.getTerrainCanvas(), 0, 0);
    ctx.drawImage(cloud.getCloudCanvas(), 0, 0);
  }

  return {
    updateX,
    updateY,
    applyOnX,
    applyOnY,
    updateZoom,
    draw,
  }
}

