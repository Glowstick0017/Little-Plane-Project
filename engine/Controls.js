// Dictionary to track the current state of key presses
let keysPressed = {};

// Flag to check if the sprint mode is active
let sprinting = false;

// HTML element to display current coordinates
let coords = document.getElementById('coords');

// Flag to determine if the canvas needs a redraw
let needsRedraw = false;

// Defining constants for keys to improve readability
const KEYS = {
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
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
    posX += dx * speed * 10;
    posY += dy * speed * 10;

    planeRotate(angle);

    // Set the flag to redraw the canvas
    needsRedraw = true;
}


const movementMapping = {
    [KEYS.W]: () => moveAndRotate(0, -1, 0),
    [KEYS.ARROW_UP]: () => moveAndRotate(0, -1, 0),
    [KEYS.A]: () => moveAndRotate(-1, 0, (3 * Math.PI) / 2),
    [KEYS.ARROW_LEFT]: () => moveAndRotate(-1, 0, (3 * Math.PI) / 2),
    [KEYS.S]: () => moveAndRotate(0, 1, Math.PI),
    [KEYS.ARROW_DOWN]: () => moveAndRotate(0, 1, Math.PI),
    [KEYS.D]: () => moveAndRotate(1, 0, Math.PI / 2),
    [KEYS.ARROW_RIGHT]: () => moveAndRotate(1, 0, Math.PI / 2),
    // Diagonal movements
    [`${KEYS.W}-${KEYS.A}`]: () => moveAndRotate(0, 0, (7 * Math.PI) / 4),
    [`${KEYS.ARROW_UP}-${KEYS.ARROW_LEFT}`]: () => moveAndRotate(0, 0, (7 * Math.PI) / 4),
    [`${KEYS.W}-${KEYS.D}`]: () => moveAndRotate(0, 0, Math.PI / 4),
    [`${KEYS.ARROW_UP}-${KEYS.ARROW_RIGHT}`]: () => moveAndRotate(0, 0, Math.PI / 4),
    [`${KEYS.D}-${KEYS.S}`]: () => moveAndRotate(0, 0, (3 * Math.PI) / 4),
    [`${KEYS.ARROW_RIGHT}-${KEYS.ARROW_DOWN}`]: () => moveAndRotate(0, 0, (3 * Math.PI) / 4),
    [`${KEYS.A}-${KEYS.S}`]: () => moveAndRotate(0, 0, (5 * Math.PI) / 4),
    [`${KEYS.ARROW_LEFT}-${KEYS.ARROW_DOWN}`]: () => moveAndRotate(0, 0, (5 * Math.PI) / 4)
};

// Game loop to handle movement and rendering
function gameLoop() {
    // Handle all movements: standard and diagonal
    for (let keyCombination in movementMapping) {
        const keys = keyCombination.split('-');
        if (keys.every(key => keysPressed[key])) {
            movementMapping[keyCombination]();
        }
    }

    // Update displayed coordinates
    coords.innerHTML = `X = ${posX / 10} Y = ${posY / 10}`;

    // Redraw the canvas if needed
    if (needsRedraw) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        needsRedraw = false; // Reset the flag after drawing
    }

    requestAnimationFrame(gameLoop); // Queue the next iteration
}

gameLoop(); // Initiate the game loop
