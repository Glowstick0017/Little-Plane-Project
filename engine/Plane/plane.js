var dom = (elemId) => document.getElementById(elemId);

class Plane {
  constructor () {
    this.colors = "null";
    this.graphics = null;
    this.domElements = null;
    this.control = {
      angle: 0,
      position: { x: 0, y: 0 },
      altitude: { value: 0 },
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

  updateState() {
    const QUALITY = quality;
    const { x, y } = this.control.position;

    console.log(QUALITY);
    
    const evalY = -y;
    const evalX = x;
    
    this.graphics.angle = this.control.angle;
    this.graphics.shadowHeight = this.control.altitude.value / 1000;
    
    this.domElements.canvas.style.setProperty("--plane-x", `${evalX}px`);
    this.domElements.canvas.style.setProperty("--plane-y", `${evalY}px`);

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

