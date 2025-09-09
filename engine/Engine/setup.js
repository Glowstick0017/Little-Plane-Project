let canvas = document.getElementById("canvas");

let rect = $canvas.getBoundingClientRect();
let width = ($canvas.width = rect.width);
let height = ($canvas.height = rect.height);
let ctx = $canvas.getContext("2d");

// altitude of the plane
let altitudeFromGround = 200;
let altitudeFactor = 50000;

// update altitude display
let displayAltitude = Math.round(altitudeFromGround);
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

