const MOUNTAIN_HEIGHT = 1.0;
const QUALITY = quality;
const ALTIUDE_FACTOR = altitudeFactor;
const MIN_ALTITUDE = 100;
const MAX_ALTITUDE = 1000;
const DEFAULT_ALTITUDE = 200;
const CLOUD_HEIGHT = 110; // Clouds start at altitude 210 (200 + 10)
const CANVAS_DIMENSIONS = {
  width, height
}

const terrain = Terrain(
  (c) => {
    $coords.innerHTML = c;
    $coordinates.innerHTML = c;
  },
  (a) => altimeterUpdate(a),
  (sL) => terrainColor(sL),
  (x, y) => perlin2(x, y),
  (s) => seed(s),
  MOUNTAIN_HEIGHT,
  CANVAS_DIMENSIONS,
  QUALITY,
  ALTIUDE_FACTOR,
  MIN_ALTITUDE,
  MAX_ALTITUDE,
  DEFAULT_ALTITUDE
);

const cloud = Cloud(
  (x, y) => perlin2(x, y),
  (s) => seed(s),
  CANVAS_DIMENSIONS,
  QUALITY,
  ALTIUDE_FACTOR,
  MIN_ALTITUDE,
  MAX_ALTITUDE,
  CLOUD_HEIGHT,
)

terrain.setSeed(HashToNumber(SHA256(seedVal + "")));
cloud.setSeed(HashToNumber(SHA256((seedVal + 200) + "")));
cloud.moveCloud();

const engine = Engine(terrain, cloud);
engine.draw();

