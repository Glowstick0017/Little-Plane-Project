// Dictionary to track the current state of key presses
let keysPressed = {};

// State flags for gameplay
let sprinting = false;
let dashing = false;
let constantFlight = false;
let pause = true;
let needsRedraw = false;

// Flight variables
let playerAngle = -Math.PI / 2;
let yawStrength = 0.02;
let dx = 0;
let dy = -1;
let heightFromGround = 0;

// Timing variables
let dashTimeRemaining = 0;
let dashCooldown = 0;

// Position variables
let posX = 0;
let posY = 0;

// Update dx and dy based on the player angle
const updateDirection = () => {
    dx = Math.cos(playerAngle);
    dy = Math.sin(playerAngle);
};

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
    TOGGLE_FORWARD: 'e',
};

// Register keypress and release events
document.addEventListener("keydown", registerKeyPress);
document.addEventListener("keyup", deregisterKeyPress);

function registerKeyPress(e) {
    keysPressed[formatKey(e.key)] = true;
}

function deregisterKeyPress(e) {
    keysPressed[formatKey(e.key)] = false;
}

function formatKey(key) {
    return key.startsWith("Arrow") ? key : key.toLowerCase();
}

// Elevate the sea level
function elevateHeight(dz) {
    heightFromGround += dz;
    needsRedraw = true;
}

// Rotate the player based on horizontal key input
const horizontalMapping = {
    [KEYS.A]: () => { playerAngle -= yawStrength; updateDirection(); },
    [KEYS.ARROW_LEFT]: () => { playerAngle -= yawStrength; updateDirection(); },
    [KEYS.D]: () => { playerAngle += yawStrength; updateDirection(); },
    [KEYS.ARROW_RIGHT]: () => { playerAngle += yawStrength; updateDirection(); },
};

// Toggle forward flight
function handleToggleForward() {
    if (keysPressed[KEYS.TOGGLE_FORWARD]) {
        constantFlight = !constantFlight;
        keysPressed[KEYS.TOGGLE_FORWARD] = false;
    }
}

// Movement, rotation, and dashing
function moveRotateAndDash() {
    if (!constantFlight) return;

    posX += dx * 10 + (dashing ? 30 * dx * dashTimeRemaining : 0);
    posY += dy * 10 + (dashing ? 30 * dy * dashTimeRemaining : 0);

    if (dashing) {
        dashTimeRemaining -= 0.2;
        if (dashTimeRemaining <= 0) {
            dashing = false;
            dashCooldown = 1.6;
        }
    } else if (dashCooldown > 0) {
        dashCooldown -= 0.2;
    }

    needsRedraw = true;
}

// Main game loop
function gameLoop() {
    if (pause) return;

    handleToggleForward();

    // Handle movement and rotation based on key presses
    for (let key in horizontalMapping) {
        if (keysPressed[key]) {
            horizontalMapping[key]();
        }
    }

    if (keysPressed[KEYS.DASH] && !dashing && dashCooldown <= 0) {
        dashing = true;
        dashTimeRemaining = 2;
    }

    if (keysPressed[KEYS.U]) {
        elevateHeight(-1);
    } else if (keysPressed[KEYS.J]) {
        elevateHeight(1);
    }

    moveRotateAndDash();

    // Redraw the canvas if needed
    if (needsRedraw) {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        draw();
        needsRedraw = false;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the game loop
