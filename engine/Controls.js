// holds which keys are being pressed
let keysPressed = {};

let sprinting = false;

// controls
document.addEventListener('keydown', function(e) {
    // makes sure commands arent being typed
    if (isfocused == true) {
        return;
    }

    // register keypress
    keysPressed[e.key] = true;
    // move up
    if(keysPressed['w'] || keysPressed['ArrowUp']) {
        posY-=speed*10;
    }
    // move left
    if(keysPressed['a'] || keysPressed['ArrowLeft']) {
        posX-=speed*10;
    }
    // move down
    if(keysPressed['s'] || keysPressed['ArrowDown']) {
        posY+=speed*10;
    }
    // move right
    if(keysPressed['d'] || keysPressed['ArrowRight']) {
        posX+=speed*10;
    }

    // clear and redraw screen, can be optimized at some point to only draw new pixels bringing speed up and can increase quality
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
});

// remove keypress
document.addEventListener('keyup', function(e) {
    keysPressed[e.key] = false;
})