// Dictionary to track the current state of key presses
let keysPressed = {};

// Flag to check if the sprint mode is active
let sprinting = false;

// HTML element to display current coordinates
let coords = document.getElementById('coords');

// Flag to determine if the canvas needs a redraw
let needsRedraw = false;

// Flag to determine if the plane is at rest or motion
let rest = true;

// Variable to track the time since the plane started moving
let dashing = false;
let dx = 0;
let dy = 0;
let t = 0;

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
    ARROW_RIGHT: 'ArrowRight'
};

// Registering keypress and release events
document.addEventListener('keydown', registerKeyPress);
document.addEventListener('keyup', deregisterKeyPress);

// Handler for key press events
function registerKeyPress(e) {
    if (isfocused) return; // Makes sure commands aren't being typed
    keysPressed[formatKey(e.key)] = true;
}

// Handler for key release events
function deregisterKeyPress(e) {
    keysPressed[formatKey(e.key)] = false;
}

function formatKey(key) {
    return key.startsWith('Arrow') ? key : key.toLowerCase();
}

// Movement and rotation function
function moveAndRotate(dx, dy, angle) {

    if(dashing == true){
        posX += dx * speed * 10 + 0.5 * dx * acceleration * 10 * t;
        posY += dy * speed * 10 + 0.5 * dy * acceleration * 10 * t;
        t -= 0.2;
    }
    else{
        posX += dx * speed * 10;
        posY += dy * speed * 10;
    }
    
    document.getElementById("coordinates").innerHTML = "Coordinates: X=" + posX/10 + ", Y=" + (posY/10)*-1;

    planeRotate(angle);

    // Set the flag to redraw the canvas
    needsRedraw = true;
}

function moveRotateAndDash(dx, dy, dashing) {
    posX += dx * speed * 10 + 20 * dx * t;
    posY += dy * speed * 10 + 20 * dy * t;
    if(dashing) t -= 0.2;
    console.log(t);
    document.getElementById("coordinates").innerHTML = "Coordinates: X=" + posX/10 + ", Y=" + (posY/10)*-1;

    // if(dx == 0) planeRotate(dy*Math.PI/2 + Math.PI/2);
    // else if(dy == 0) planeRotate(dx*Math.PI/2);

    // Set the flag to redraw the canvas
    needsRedraw = true;
}

const movementMapping = {
    [KEYS.W]: () => moveAndRotate(0, -1, 0, 0),
    [KEYS.ARROW_UP]: () => moveAndRotate(0, -1, 0, 0),
    [KEYS.A]: () => moveAndRotate(-1, 0, (3 * Math.PI) / 2, 0),
    [KEYS.ARROW_LEFT]: () => moveAndRotate(-1, 0, (3 * Math.PI) / 2, 0),
    [KEYS.S]: () => moveAndRotate(0, 1, Math.PI, 0),
    [KEYS.ARROW_DOWN]: () => moveAndRotate(0, 1, Math.PI, 0),
    [KEYS.D]: () => moveAndRotate(1, 0, Math.PI / 2, 0),
    [KEYS.ARROW_RIGHT]: () => moveAndRotate(1, 0, Math.PI / 2, 0),
    // Diagonal movements
    [`${KEYS.W}-${KEYS.A}`]: () => moveAndRotate(0, 0, (7 * Math.PI) / 4, 0),
    [`${KEYS.ARROW_UP}-${KEYS.ARROW_LEFT}`]: () => moveAndRotate(0, 0, (7 * Math.PI) / 4, 0),
    [`${KEYS.W}-${KEYS.D}`]: () => moveAndRotate(0, 0, Math.PI / 4, 0),
    [`${KEYS.ARROW_UP}-${KEYS.ARROW_RIGHT}`]: () => moveAndRotate(0, 0, Math.PI / 4, 0),
    [`${KEYS.D}-${KEYS.S}`]: () => moveAndRotate(0, 0, (3 * Math.PI) / 4, 0),
    [`${KEYS.ARROW_RIGHT}-${KEYS.ARROW_DOWN}`]: () => moveAndRotate(0, 0, (3 * Math.PI) / 4, 0),
    [`${KEYS.A}-${KEYS.S}`]: () => moveAndRotate(0, 0, (5 * Math.PI) / 4, 0),
    [`${KEYS.ARROW_LEFT}-${KEYS.ARROW_DOWN}`]: () => moveAndRotate(0, 0, (5 * Math.PI) / 4, 0),
};

const horizontalMapping = {
    [KEYS.A]: () => {dx = -1},
    [KEYS.ARROW_LEFT]: () => {dx = -1},
    [KEYS.D]: () => {dx = 1},
    [KEYS.ARROW_RIGHT]: () => {dx = 1},
};

const verticalMapping = {
    [KEYS.W]: () => {dy = -1},
    [KEYS.ARROW_UP]: () => {dy = -1},
    [KEYS.S]: () => {dy = 1},
    [KEYS.ARROW_DOWN]: () => {dy = 1},
};

// Game loop to handle movement and rendering
function gameLoop() {
    // Handle all movements: standard and diagonal
    // for (let keyCombination in movementMapping) {
    //     const keys = keyCombination.split('-');
    //     if (keys.every(key => keysPressed[key])) {
    //         movementMapping[keyCombination]();
    //     }
    // }
    dx = 0;
    dy = 0;
    for(let key in horizontalMapping){
        if (keysPressed[key]) {
            horizontalMapping[key]();
        }
    }

    for(let key in verticalMapping){
        if (keysPressed[key]) {
            verticalMapping[key]();
        }
    }
    console.log(dx, dy);
    if(keysPressed[KEYS.DASH] && !dashing){
        dashing = true
        t = 2;
    }
    // else if(!keysPressed[KEYS.DASH] && !dashing){
    //     dashing = false;
    // }
    else if( t < 0){  
        dashing = false;
    }
    moveRotateAndDash(dx, dy, dashing)
    // Update displayed coordinates
    coords.innerHTML = `X = ${posX / 10} Y = ${(-1) * posY / 10}`;

    // Redraw the canvas if needed
    if (needsRedraw) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        needsRedraw = false; // Reset the flag after drawing
    }

    requestAnimationFrame(gameLoop); // Queue the next iteration
}

gameLoop(); // Initiate the game loop
