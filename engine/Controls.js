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
    
let t = 0;
let cooldown = 0;

// Delta time tracking for frame-rate independent movement
let lastFrameTime = performance.now();
let deltaTime = 0;

// speed of the plane
let minSpeed = 0.5;
let maxSpeed = 1.5;
let throttlePower = 0.5;

// altitude based
let minAltitude = 100;
let maxAltitude = 1000;
let altSpeed = 1;

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
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    LT_SQ_BRACKET: "[",
    RT_SQ_BRACKET: "]",
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
function elevateAltitude(dz) {
    engine.updateZoom(dz);
    needsRedraw = true;
}

function clamp(value, min, max) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

function speedometerUpdate() {
    $speed.innerHTML = `Speed: ${speed}`;

    let speedometerNeedleAnglePercent = (speed - minSpeed);
    speedometerNeedleAnglePercent /= (maxSpeed - minSpeed);
    speedometerNeedleAnglePercent *= 100;

    updateSpeedometerNeedle(speedometerNeedleAnglePercent);
}

function altimeterUpdate(altitude) {
    let displayAltitude = Math.round(altitude);
    $altitude.innerHTML = "Altitude = " + displayAltitude;
    $settingsAltitude.innerHTML = "Altitude: " + displayAltitude;

    let altimeterNeedleAnglePercent = (altitude - minAltitude);
    altimeterNeedleAnglePercent /= (maxAltitude - minAltitude);
    altimeterNeedleAnglePercent = altimeterNeedleAnglePercent;
    altimeterNeedleAnglePercent *= 100;

    let adjustedShadowHeight = 1.01 - (altimeterNeedleAnglePercent / 100);
    adjustedShadowHeight *= adjustedShadowHeight * adjustedShadowHeight;

    plane.setShadowHeight(adjustedShadowHeight);
    updateAltimeterNeedle(altimeterNeedleAnglePercent * 1.5);
}

function throttleChange(updateFn) {
    let shouldClamp = true;

    if (minSpeed > speed || speed > maxSpeed) {
        shouldClamp = false;
    }

    speed = updateFn(speed, throttlePower / 100);
    if (shouldClamp) {
        speed = clamp(speed, minSpeed, maxSpeed);
    }

    // More realistic speed-to-pitch mapping for propeller sound
    const speedFactor = (speed - minSpeed) / (maxSpeed - minSpeed);
    // Gentler pitch progression for propeller
    const pitchMultiplier = 0.8 + (speedFactor * 0.6);
    
    soundsEngine.setFrequencies(planeSound.map(([f, vol, waveType]) => [
        f * pitchMultiplier,
        vol * (0.85 + speedFactor * 0.3), // Subtle volume increase with speed
        waveType
    ]));

    speedometerUpdate();
}

throttleChange((s, tp) => s); // Initialize speed

// Movement Rotation
function moveRotate(dx, dy , keyPressedFlag) {

    // Update the position of plane based on the direction of movement, only if any of the keys is pressed
    if (keyPressedFlag) {
        // Use deltaTime to make movement frame-rate independent
        // Movement speed is normalized to 60 FPS (deltaTime is in seconds, so multiply by speed factors)
        const normalizedMovement = deltaTime * 60;
        engine.applyOnX(x => x + dx * speed * 10 * normalizedMovement);
        engine.applyOnY(y => y + dy * speed * 10 * normalizedMovement);
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
    [KEYS.A]: () => { playerAngle -= yawStrength * deltaTime * 60 , updateDirection()},
    [KEYS.ARROW_LEFT]: () => { playerAngle -= yawStrength * deltaTime * 60 , updateDirection()},
    [KEYS.D]: () => { playerAngle += yawStrength * deltaTime * 60 , updateDirection()},
    [KEYS.ARROW_RIGHT]: () => { playerAngle += yawStrength * deltaTime * 60 , updateDirection()},
};

// Dictionary to map input keys to toggle throttle
const verticalMapping = {
    [KEYS.W]: () => { throttleChange((s, tp) => s + tp * deltaTime * 60) },
    [KEYS.ARROW_UP]: () => { throttleChange((s, tp) => s + tp * deltaTime * 60) },
    [KEYS.S]: () => { throttleChange((s, tp) => s - tp * deltaTime * 60) },
    [KEYS.ARROW_DOWN]: () => { throttleChange((s, tp) => s - tp * deltaTime * 60) },
};

// Function to initialize the game
function gameInit() {
    // update instruments
    speedometerUpdate();
    altimeterUpdate(200);
}

// Game loop to handle movement and rendering
function gameLoop(currentTime) {
    // Calculate delta time in seconds
    deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;
    
    // Cap delta time to avoid huge jumps (e.g., when tab is inactive)
    if (deltaTime > 0.1) {
        deltaTime = 0.1;
    }
    
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

    if(keysPressed[KEYS.LT_SQ_BRACKET]){
        // Make altitude change frame-rate independent
        elevateAltitude(-altSpeed * deltaTime * 60);
    }
    else if(keysPressed[KEYS.RT_SQ_BRACKET]){
        // Make altitude change frame-rate independent
        elevateAltitude(altSpeed * deltaTime * 60);
    }

    moveRotate(dx, dy , keyPressedFlag)

    // Redraw the canvas if needed
    if (needsRedraw) {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        engine.draw();
        needsRedraw = false; // Reset the flag after drawing
    }

  requestAnimationFrame(gameLoop); // Queue the next iteration
}

gameInit(); // Initialize the game
requestAnimationFrame(gameLoop); // Initiate the game loop with proper timestamp
