let canvas = document.getElementById("canvas");

// create all the variables with references to the html elements
const $canvas = document.getElementById("canvas");
const $color = document.getElementById("color");
const $commandBox = document.getElementById("commandBox");
const $coordinates = document.getElementById("coordinates");
const $coords = document.getElementById("coords");
const $customize = document.getElementById("customize");
const $customizeMenu = document.getElementById("customizeMenu");
const $hamburger = document.getElementById("hamburger");
const $nav = document.getElementById("nav");
const $quality = document.getElementById("quality");
const $resetDefault = document.getElementById("resetDefault");
const $result = document.getElementById("result");
const $seed = document.getElementById("seed");
const $settings = document.getElementById("settings");
const $settingsMenu = document.getElementById("settingsMenu");
const $speed = document.getElementById("speed");
const $altitude = document.getElementById("altitude");
const $settingsAltitude = document.getElementById("settings-altitude");
const $start = document.getElementById("start");
const $ui = document.getElementById("ui");
const $welcome = document.getElementById("welcome");
const $planeColors = document.querySelectorAll(
  '.planeColors input[type="color"]'
);

let rect = $canvas.getBoundingClientRect();
let width = ($canvas.width = rect.width);
let height = ($canvas.height = rect.height);
let ctx = $canvas.getContext("2d");

let buffer_canvas = document.createElement('canvas');
buffer_canvas.width = canvas.width;
buffer_canvas.height = canvas.height;
let buffer_ctx = buffer_canvas.getContext("2d");

let cloud_canvas = document.createElement('canvas');
cloud_canvas.width = canvas.width;
cloud_canvas.height = canvas.height;
let cloud_ctx = cloud_canvas.getContext("2d");

// cloud related
let cloudSpeedX = 0.2 * Math.random();
let cloudSpeedY = 0.2 * Math.random();
let cloudHeight = 300;
let cloudTransitionStart = 100;
let cloudTransitionEnd = 150;

// position of current screen
let posX = 0;
let posY = 0;
$coordinates.innerHTML = "Coordinates: X=" + posX + ", Y=" + posY;

// altitude of the plane
let altitudeFromGround = 200;
let altitudeFactor = 50000;

// update altitude display
let displayAltitude = Math.round((altitudeFromGround));
$altitude.innerHTML = "Altitude = " + displayAltitude;
$settingsAltitude.innerHTML = "Altitude: " + displayAltitude;

// block size by pixel, i wouldn't recommend going under 5, load times will be longer
let quality = 10;
$quality.innerHTML = "Quality: " + quality + "px";

// speed at which the camera moves
let speed = 1;
$speed.innerHTML = "Speed: " + speed;

let color = 1;
$color.innerHTML = "Color: " + color;

// start every game with random seed
let seedVal = Math.floor(Math.random() * 1000000);
seed(HashToNumber(SHA256(seedVal + "")));
$seed.innerHTML = "Seed: " + seedVal;

// initial draw
draw();

// Calculate the camera height from the altitude
function cameraHeight(altitude) {
  return altitude / altitudeFactor;
}

function adjustedPositions(xVal, yVal) {
  let adjustedX = Math.round(xVal / quality) * quality - (width / 2);
  let adjustedY = Math.round(yVal / quality) * quality - (height / 2);

  return {
    x: adjustedX,
    y: adjustedY
  }
}

// Baseline sea level
function calculateSeaLevel(x, y) {
  // set values to variables so they can be adjusted (by slider?)
  let mountainHeight = 1; // nice visual range: 0 - 1.3
  let { x: adjustedX, y: adjustedY } = adjustedPositions(posX, posY);
  let camHeight = cameraHeight(altitudeFromGround);

  return (
    (
      perlin2(
        (x + adjustedX) * camHeight,
        (y + adjustedY) * camHeight
      ) + mountainHeight
    ) / 2
  );
}

// Calculate the cloud density
function calculateCloudDensity(x, y) {
  let xOffset = Date.now() * cloudSpeedX;
  let yOffset = Date.now() * cloudSpeedY;

  let { x: adjPosX, y: adjPosY } = adjustedPositions(posX, posY);
  let { x: adjOffX, y: adjOffY } = { x: xOffset, y: yOffset };

  let adjustedX = adjPosX + adjOffX;
  let adjustedY = adjPosY + adjOffY;
  let camHeight = cameraHeight(altitudeFromGround - cloudHeight);

  let noise = perlin2(
    (x + adjustedX) * camHeight,
    (y + adjustedY) * camHeight
  );

  let adjustedNoise = (1 + noise) / 2;
  if (adjustedNoise < 0.6) adjustedNoise = 0;
  
  let visibilityFactor = 0;
  
  if (altitudeFromGround < cloudHeight) {
    visibilityFactor = 0;
  } else if (altitudeFromGround < cloudHeight + cloudTransitionStart) {
    visibilityFactor = altitudeFromGround - cloudHeight;
    visibilityFactor /= cloudTransitionStart;
  } else if (altitudeFromGround < cloudHeight + cloudTransitionEnd) {
    visibilityFactor = altitudeFromGround;
    visibilityFactor -= cloudHeight + cloudTransitionStart;
    visibilityFactor /= cloudTransitionEnd - cloudTransitionStart;
    visibilityFactor = 2 - visibilityFactor;
    visibilityFactor = Math.min(visibilityFactor, 1);
  } else {
    visibilityFactor = 1;
  }
  
  adjustedNoise *= visibilityFactor;
  return adjustedNoise;
}

// Draw terrain
function drawTerrain() {
  const drawing_batch = new Map()
  const fixed_quality = quality

  for (let x = -fixed_quality; x < width + fixed_quality; x += fixed_quality) {
    let last_color = "";
    for (let y = -fixed_quality; y < height + fixed_quality; y += fixed_quality) {
      const seaLevel = calculateSeaLevel(x, y);
      const color = getColor(seaLevel);

      if (!drawing_batch.get(color)) {
        drawing_batch.set(color, [])
      }

      if (last_color === color) {
        const to_increase = drawing_batch.get(color).pop()
        drawing_batch.get(color).push({
          ...to_increase,
          delta_y: to_increase.delta_y + fixed_quality
        })
      }
      else {
        drawing_batch.get(color).push({
          x, y, delta_x: fixed_quality, delta_y: fixed_quality
        })
      }

      last_color = color
    }
  }

  const drawOffsetX = (posX + fixed_quality / 2) % fixed_quality;
  const drawOffsetY = (posY + fixed_quality / 2) % fixed_quality;

  for (let [color, squares] of drawing_batch) {
    buffer_ctx.fillStyle = color;
    for (let square of squares) {
      buffer_ctx.fillRect(
        square.x - drawOffsetX,
        square.y - drawOffsetY,
        square.delta_x,
        square.delta_y
      );
    }
  }
}

// Draw clouds
function drawClouds() {
  const fixed_quality = quality

  const drawOffsetX = (posX + fixed_quality / 2) % fixed_quality;
  const drawOffsetY = (posY + fixed_quality / 2) % fixed_quality;

  cloud_ctx.clearRect(0, 0, width, height);

  for (let x = -fixed_quality; x < width + fixed_quality; x += fixed_quality) {
    for (let y = -fixed_quality; y < height + fixed_quality; y += fixed_quality) {
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
        fixed_quality,
        fixed_quality
      );
    }
  }
}

// Initial draw function
function draw() {
  drawTerrain();
  seed(HashToNumber(SHA256((seedVal + 200) + "")));
  drawClouds();
  seed(HashToNumber(SHA256(seedVal + "")));

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(buffer_canvas, 0, 0);
  ctx.drawImage(cloud_canvas, 0, 0);
}

// Define terrain
function getColor(seaLevel) {
  if (color === 0) {
    const gray_scale_range = (seaLevel * 255).toFixed();
    return `rgb(${gray_scale_range}, ${gray_scale_range}, ${gray_scale_range})`;
  } else {
    return terrainColor(seaLevel);
  }
}
