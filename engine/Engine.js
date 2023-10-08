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
const $result = document.getElementById("result");
const $seed = document.getElementById("seed");
const $settings = document.getElementById("settings");
const $settingsMenu = document.getElementById("settingsMenu");
const $speed = document.getElementById("speed");
const $ui = document.getElementById("ui");
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


// position of current screen
let posX = 0;
let posY = 0;
let heightFromGround = 300; // nice visual range: 250 - 500
$coordinates.innerHTML = "Coordinates: X=" + posX + ", Y=" + posY;

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

/** zoom feature that doesn't work well yet
document.addEventListener('wheel', function(e) {
    if(e.deltaY > 0 && zoom > 100) {
        zoom-=100;
    } else if (e.deltaY < 0 && zoom < 10000) {
        zoom+=100;
    }
    buffer_ctx.clearRect(0,0,$canvas.width,$canvas.height);
    draw();
})
 */

// Initial draw function
function draw() {
  const drawing_batch = new Map()
  const fixed_quality = quality

  for (let x = 0; x < width; x += fixed_quality) {
    let last_color = "";
    for (let y = 0; y < height; y += fixed_quality) {
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

  for (let [color, squares] of drawing_batch) {
    buffer_ctx.fillStyle = color;
    for (let square of squares) {
      buffer_ctx.fillRect(square.x, square.y, square.delta_x, square.delta_y);
    }
  }

  ctx.drawImage(buffer_canvas, 0, 0);
}

// Baseline sea level
function calculateSeaLevel(x, y) {
  // set values to variables so they can be adjusted (by slider?)
  let mountainHeight = 1.0; // nice visual range: 0 - 1.3

  return (
    (perlin2((x + posX) / heightFromGround, (y + posY) / heightFromGround) +
      mountainHeight) /
    2
  );
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
