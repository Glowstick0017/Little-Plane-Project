var dom = (elemId) => document.getElementById(elemId);

class Plane {
  constructor () {
    this.colors = "null";
    this.graphics = null;
    this.domElements = null;
    this.control = {
      angle: 0,
      speed: 0,
      lastUpdateTimestamp: Date.now(),
      altitude: 0,
      position: { startX: 0, startY: 0 },
    };
  }

  setDom(domElements) {
    this.domElements = domElements;
  }
  
  initGraphics() {
    this.graphics = new PlaneGraphics(this.domElements.canvas);
    this.updateColors();
  }

  updateColors() {
    let colors = this.colors;
    colors = colors.split(",");
    colors = colors.slice(1);

    for (let color of colors) {
      let values = color.split(":");
      this.graphics.setColor(values[0], values[1]);
    }
  }

  updateGraphics() {
    const { altitude, angle } = this.control;

    let altimeterNeedleAnglePercent = (altitude - minAltitude);
    altimeterNeedleAnglePercent /= (maxAltitude - minAltitude);
    altimeterNeedleAnglePercent = altimeterNeedleAnglePercent;
    altimeterNeedleAnglePercent *= 100;

    let adjustedShadowHeight = 1.01 - (altimeterNeedleAnglePercent / 100);
    adjustedShadowHeight *= adjustedShadowHeight * adjustedShadowHeight;

    this.graphics.setShadowHeight(adjustedShadowHeight);
    this.graphics.setAngle(angle);
  }

  updateState() {
    const {
      speed,
      angle,
      lastUpdateTimestamp,
      altitude: planeAltitude,
      position: { startX, startY },
    } = this.control;

    const dT = (Date.now() - lastUpdateTimestamp) * 0.6;
    const dX = Math.sin(angle);
    const dY = Math.cos(angle);
    
    const evalVel = speed * dT;
    const evalAlt = ALTIUDE_FACTOR / (planeAltitude * 10);
    
    const xElapsed = dX * evalVel / evalAlt;
    const yElapsed = dY * evalVel / evalAlt;
    
    const derivedX = startX + xElapsed;
    const direvedY = startY + yElapsed;
    
    const globalAltitude = engine.getPosition().altitude;
    const coordFactor = ALTIUDE_FACTOR / (globalAltitude * 10);

    const evalScale = planeAltitude / globalAltitude;
    const evalX = derivedX * coordFactor;
    const evalY = direvedY * coordFactor;
    
    const canvasStyle = this.domElements.canvas.style;
    const styleProperties = {
      "--plane-x": `${evalX}px`,
      "--plane-y": `${evalY}px`,
      "--plane-z-index": `${Math.floor(planeAltitude)}`,
      "--plane-scale": `${evalScale}`,
    };

    for (let prop in styleProperties) {
      canvasStyle.setProperty(prop, styleProperties[prop]);
    }
    
    this.updateGraphics();
    requestAnimationFrame(() => this.updateState());
  }
}

class PlaneManager {
  constructor () {
    this.planes = {};
  }

  draw() {
    const planes = Object.values(this.planes);

    for (let plane of planes) {
      const canvas = plane.domElements.canvas;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.getContext("2d").clearRect(0, 0, width, height);
    }

    for (let plane of planes) {
      plane.graphics?.draw();
    }

    requestAnimationFrame(() => this.draw());
  }
}

