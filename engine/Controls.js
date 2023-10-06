// Dictionary to track the current state of key presses
let keysPressed = {};

// Flag to check if the sprint mode is active
let sprinting = false;

// Flag to determine if the canvas needs a redraw
let needsRedraw = false;

// Variable to track the time since the plane started moving
let dashing = false;
let dx = 0;
let dy = 0;
let t = 0;
let cooldown = 0;

// Defining constants for keys to improve readability
const KEYS = {
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    DASH: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    U: "u",
    J: "j",
};

// Registering keypress and release events
document.addEventListener("keydown", registerKeyPress);
document.addEventListener("keyup", deregisterKeyPress);

// Handler for key press events
function registerKeyPress(e) {
  if (handler.isFocused) return; // Makes sure commands aren't being typed
  keysPressed[formatKey(e.key)] = true;
}

// Handler for key release events
function deregisterKeyPress(e) {
  keysPressed[formatKey(e.key)] = false;
}

function formatKey(key) {
  return key.startsWith("Arrow") ? key : key.toLowerCase();
}

// Elevate the sea level
function elevateHeight(dz) {
  heightFromGround += dz;

  // Set the flag to redraw the canvas
  needsRedraw = true;
}

// Movement Rotation and Dash Function
function moveRotateAndDash(dx, dy, dashing) {

    // Update the position of plane based on the direction of movement and dash status
    posX += dx * speed * 10 + 30 * dx * t;
    posY += dy * speed * 10 + 30 * dy * t;
    if(dashing) t -= 0.2;
    else if(cooldown) cooldown -= 0.2;
    // console.log(t);

    // // Rotate the plane based on the direction of movement
    if(dx == 0 && dy == 0) /*Blank case*/;
    else if(dx >= 0) plane.rotate(Math.atan(dy/dx) + Math.PI/2);
    else plane.rotate(Math.atan(dy/dx) - Math.PI/2);
    // console.log(Math.atan(-dy/dx)*180/Math.PI);

    // Set the flag to redraw the canvas
    needsRedraw = true;
}

// Dictionary to map input keys to horizontal movement
const horizontalMapping = {
    [KEYS.A]: () => {dx = -1},
    [KEYS.ARROW_LEFT]: () => {dx = -1},
    [KEYS.D]: () => {dx = 1},
    [KEYS.ARROW_RIGHT]: () => {dx = 1},
};

// Dictionary to map input keys to vertical movement
const verticalMapping = {
    [KEYS.W]: () => {dy = -1},
    [KEYS.ARROW_UP]: () => {dy = -1},
    [KEYS.S]: () => {dy = 1},
    [KEYS.ARROW_DOWN]: () => {dy = 1},
};

// Game loop to handle movement and rendering
function gameLoop() {
    //Reset to 0 incase of no inputs
    dx = 0;
    dy = 0;

    // Check if any of the keys are pressed and update dx
    for(let key in horizontalMapping){
        if (keysPressed[key]) {
            horizontalMapping[key]();
        }
    }

    // Check if any of the keys are pressed and update dy
    for(let key in verticalMapping){
        if (keysPressed[key]) {
            verticalMapping[key]();
        }
    }

    // Check if the dash key is pressed if dash flag is false
    if(keysPressed[KEYS.DASH] && !dashing && cooldown <= 0){
        dashing = true
        // Duration of the dash
        t = 2;
    }

    else if( t < 0){  
        dashing = false;
        cooldown = 1.6;
        t = 0;
    }

    if(keysPressed[KEYS.U]){
        elevateHeight(-1);
    }
    else if(keysPressed[KEYS.J]){
        elevateHeight(1);
    }

    moveRotateAndDash(dx, dy, dashing)
    // Update displayed coordinates
    coords.innerHTML = `X = ${Math.round(posX / 10)} Y = ${Math.round((-1) * posY / 10)}`;

  // Redraw the canvas if needed
  if (needsRedraw) {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    draw();
    needsRedraw = false; // Reset the flag after drawing
  }

  requestAnimationFrame(gameLoop); // Queue the next iteration
}

gameLoop(); // Initiate the game loop
