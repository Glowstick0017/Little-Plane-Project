class PlaneGraphics {
  constructor(canvas) {
    this.canvas = canvas;
    this.rect = this.canvas.getBoundingClientRect();
    this.width = this.canvas.width = this.rect.width;
    this.height = this.canvas.height = this.rect.height;
    this.ctx = this.canvas.getContext("2d");

    this.scale = 2;
    this.startx = this.width / 2 - 120 / this.scale;
    this.starty = this.height / 2 - 100 / this.scale;

    this.angle = 0.0;

    this.propellerState = 0;
    this.propellerSpeed = 10;
    this.lastPropellerUpdate = performance.now();
    
    this.model = MODELS.Extra300;
    this.propellerFrames = this.model.propellerFrames;
    this.parts = this.model.parts;

    this.shadowHeight = 0.5;
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.startx + x / this.scale,
      this.starty + y / this.scale,
      width / this.scale,
      height / this.scale
    );
  }

  drawShadow() {
    let shadowHeightSq = this.shadowHeight * this.shadowHeight;
    if (shadowHeightSq <= 0.4) { return; }

    this.scale /= shadowHeightSq;
    this.ctx.translate(
      -32 * this.scale / this.shadowHeight + 48,
      32 * this.scale / this.shadowHeight - 48
    );

    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate(this.angle);
    this.ctx.translate(-this.width / 2, -this.height / 2);
    
    for (const partName in this.parts) {
      const part = this.parts[partName];
      for (const coord of part.coords) {
        this.drawRect(
          ...coord,
          `rgba(0, 0, 0, ${shadowHeightSq * 0.5})`
        );
      }
    }
    
    this.scale *= this.shadowHeight * this.shadowHeight;
    this.ctx.resetTransform();
  }

  drawPlane() {
    for (const partName in this.parts) {
      const part = this.parts[partName];
      for (const coord of part.coords) {
        this.drawRect(...coord, part.color);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawShadow();
    this.rotatePropeller();
    
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate(this.angle);
    this.ctx.translate(-this.width / 2, -this.height / 2);
    
    this.drawPlane();
    this.ctx.resetTransform();
  }

  rotate(angle) {
    this.angle = angle;
  }

  rotatePropeller() {
    const currentTime = performance.now();
    const elapsedMs = (currentTime - this.lastPropellerUpdate)
    const deltaTime =  elapsedMs / 1000;
    const spinDistance = this.propellerSpeed * deltaTime;

    this.lastPropellerUpdate = currentTime;
    
    this.propellerState += spinDistance;
    this.propellerState %= this.propellerFrames.length;

    const frameIndex = Math.floor(this.propellerState);
    const newCoords = this.propellerFrames[frameIndex];

    this.parts.propellerBlades.coords = newCoords;
  }

  setColor(partName, newColor) {
    if (this.parts[partName]) {
      this.parts[partName].color = newColor;
    }
  }

  setShadowHeight(newHeight) {
    this.shadowHeight = newHeight;
  }

  resetDefaults() {
    this.parts["outer"].color = '#770619';
    this.parts["innerMain"].color = '#ac322e';
    this.parts["innerHighlight"].color = '#d85665';
    this.parts["innerDarkHighlight"].color = '#8c0308';
    this.parts["aroundWindshield"].color = '#570101';
    this.parts["windshield"].color = '#0ba0d2';
    this.parts["propeller"].color = '#333333';
    this.parts["propellerBlades"].color = '#b3b3b3';
  }

  updateDom(dom) {
    const parts = this.parts;
    const partNames = Object.keys(parts);

    for (let part of partNames) {
      if (!dom[part]) continue;
      dom[part].value = parts[part].color;
    }
  }
}

