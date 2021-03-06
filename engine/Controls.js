// holds which keys are being pressed
let keysPressed = {};

let sprinting = false;

let coords = document.getElementById('coords');

// controls
document.addEventListener('keydown', function(e) {
    // makes sure commands arent being typed
    if (isfocused === true) {
        return;
    }
    // register keypress
    keysPressed[e.key] = true;
});

// remove keypress
document.addEventListener('keyup', function(e) {
    keysPressed[e.key] = false;
})

// mobile controls
document.addEventListener('wheel', function(e) {
    if(e.deltaY > 0) {
        keysPressed['w'] = true;
    }
    if (e.deltaY < 0) {
        keysPressed['s'] = true;
    }
    if(e.deltaX > 0) {
        keysPressed['a'] = true;
    }
    if (e.deltaX < 0) {
        keysPressed['d'] = true;
    }
    if (e.deltaY === 0 && e.deltaX === 0) {
        keysPressed['w'] = false;
        keysPressed['a'] = false;
        keysPressed['s'] = false;
        keysPressed['d'] = false;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
})

function gameLoop() {
    // move up
    if(keysPressed['w'] || keysPressed['ArrowUp']) {
        posY-=speed*10;
        planeRotate(0);
    }
    // move left
    if(keysPressed['a'] || keysPressed['ArrowLeft']) {
        posX-=speed*10;
        planeRotate((3*Math.PI) / 2);
    }
    // move down
    if(keysPressed['s'] || keysPressed['ArrowDown']) {
        posY+=speed*10;
        planeRotate(Math.PI);
    }
    // move right
    if(keysPressed['d'] || keysPressed['ArrowRight']) {
        posX+=speed*10;
        planeRotate(Math.PI / 2);
    }

    // angles
    if((keysPressed['w'] && keysPressed['a']) || (keysPressed['ArrowUp'] && keysPressed['ArrowLeft'])) {
        planeRotate((7 * Math.PI) / 4);
    } else if ((keysPressed['w'] && keysPressed['d']) || (keysPressed['ArrowUp'] && keysPressed['ArrowRight'])) {
        planeRotate(Math.PI / 4);
    } else if ((keysPressed['d'] && keysPressed['s']) || (keysPressed['ArrowRight'] && keysPressed['ArrowDown'])) {
        planeRotate((3 * Math.PI) / 4);
    } else if ((keysPressed['a'] && keysPressed['s']) || (keysPressed['ArrowLeft'] && keysPressed['ArrowDown'])) {
        planeRotate((5 * Math.PI) / 4);
    }

    coords.innerHTML = "X = " + (posX/10) + " Y = " + (posY/10);

    // clear and redraw screen, can be optimized at some point to only draw new pixels bringing speed up and can increase quality
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    setTimeout(gameLoop, 10);
}
gameLoop();