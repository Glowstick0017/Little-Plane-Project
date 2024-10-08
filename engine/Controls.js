// Dictionary to track the current state of key presses
let keysPressed = {};

// Flag to check if the sprint mode is active
let sprinting = false;

// Flag to determine if the canvas needs a redraw
let needsRedraw = false;

//Unit Vector for direction
let dx = 0;
let dy = -1;

//player Angle for plane's yaw 
let playerAngle = -3.14 / 2;
let yawStrength = 0.02; //the strength of rotation

//constant flight toggle
let constantFlight = false;

//pause
let pause = true;
    
let baseSpeed = 1;
let speedMultiplier = 3;
let currentSpeed = baseSpeed;

//update dx and dy based on player angle
const updateDirection = () => {
    dx = Math.cos(playerAngle);
    dy = Math.sin(playerAngle);
}


// Defining constants for keys to improve readability
const KEYS = {
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    SPRINT: 'shift',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    U: "u",
    J: "j",
    ToggleForward: 'e',
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

// Movement Rotation and Sprint Function
function moveRotateAndSprint(dx, dy, sprinting , keyPressedFlag) {

    // Update the position of plane based on the direction of movement and sprint status , only if any of the keys is pressed
    if (keyPressedFlag) {
        posX += dx * speed * 10 + 30 * dx;
        posY += dy * speed * 10 + 30 * dy;
    }
    // // Rotate the plane based on the direction of movement

    if(dx === 0 && dy === 0) /*Blank case*/;
    else if(dx >= 0) plane.rotate(Math.atan(dy/dx) + Math.PI/2);
    else plane.rotate(Math.atan(dy/dx) - Math.PI/2);
    // console.log(Math.atan(-dy/dx)*180/Math.PI);

    // Set the flag to redraw the canvas
    needsRedraw = true;
}

// Dictionary to map input keys to change the playerAngle
const horizontalMapping = {
    [KEYS.A]: () => { playerAngle -= yawStrength , updateDirection()},
    [KEYS.ARROW_LEFT]: () => { playerAngle -= yawStrength , updateDirection()},
    [KEYS.D]: () => { playerAngle += yawStrength , updateDirection()},
    [KEYS.ARROW_RIGHT]: () => { playerAngle += yawStrength , updateDirection()},
};

// Dictionary to map input keys to toggle throttle
const verticalMapping = {
    [KEYS.W]: () => {},
    [KEYS.ARROW_UP]: () => {},
};

// Game loop to handle movement and rendering
function gameLoop() {
    if (pause) {
        keysPressed = {};
    }

    let keyPressedFlag;

    if (keysPressed[KEYS.ToggleForward]){
        constantFlight=!constantFlight;
        keysPressed[KEYS.ToggleForward]=false;
    }
    constantFlight ? keyPressedFlag=true : keyPressedFlag=false;

    // Check if any of the keys are pressed and update dx
    for(let key in horizontalMapping){
        if (keysPressed[key]) {
            horizontalMapping[key]();
            keyPressedFlag = true;
        }
    }

    // Check if any of the keys are pressed and update dy and change the flag to true
    for(let key in verticalMapping){
        if (keysPressed[key]) {
            verticalMapping[key]();
            keyPressedFlag = true;
        }
    }

    // Check if the sprint key is pressed
    if (keysPressed[KEYS.SPRINT]) {
        sprinting = true;
        speed = currentSpeed * speedMultiplier; // Update speed for sprinting
    } else {
        sprinting = false;
        speed = currentSpeed;
    }

    if(keysPressed[KEYS.U]){
        elevateHeight(-1);
    }
    else if(keysPressed[KEYS.J]){
        elevateHeight(1);
    }

    moveRotateAndSprint(dx, dy, sprinting , keyPressedFlag)
    // Update displayed coordinates
    $coords.innerHTML = `X = ${Math.round(posX / 10)} Y = ${Math.round((-1) * posY / 10)}`;
    $coordinates.innerHTML =
        `Coordinates: X= ${Math.round(posX / 10)} Y= ${Math.round((-1) * posY / 10)}`;

  // Redraw the canvas if needed
  if (needsRedraw) {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    draw();
    needsRedraw = false; // Reset the flag after drawing
  }

  requestAnimationFrame(gameLoop); // Queue the next iteration
}

gameLoop(); // Initiate the game loop
