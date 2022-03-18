var canvas= document.getElementById("canvas");
var rect = canvas.getBoundingClientRect();
var width = canvas.width = rect.width;
var height = canvas.height = rect.height;
var ctx = canvas.getContext("2d");

var posX = 0;
var posY = 0;

var zoom = 300;

var quality = 10;

let keysPressed = {};

draw();

document.addEventListener('keydown', function(e) {
    keysPressed[e.key] = true;
    if(keysPressed['w']) {
        posY-=10;
    }
    if(keysPressed['a']) {
        posX-=10;
    }
    if(keysPressed['s']) {
        posY+=10;
    }
    if(keysPressed['d']) {
        posX+=10;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
});

document.addEventListener('keyup', function(e) {
    keysPressed[e.key] = false;
})

/**
document.addEventListener('wheel', function(e) {
    if(e.deltaY > 0 && zoom > 100) {
        zoom-=100;
    } else if (e.deltaY < 0 && zoom < 10000) {
        zoom+=100;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
})
 */

function terrainColor(c) {
    // sea
    if (c < .33) {
        if (c<.055) {
            return `rgb(0, 15, 44)`
        } else if (c<.110) {
            return `rgb(0, 31, 60)`
        } else if (c<.165) {
            return `rgb(3, 55, 81)`
        } else if (c<.220) {
            return `rgb(14, 78, 106)`
        } else if (c<.275) {
            return `rgb(23, 93, 119)`
        } else {
            return `rgb(37, 107, 133)`
        }
    }
    // beach
    else if (c < .5) {
        if (c<.358) {
            return `rgb(100, 171, 227)`
        } else if (c<.386) {
            return `rgb(146, 196, 238)`
        } else if (c<.414) {
            return `rgb(187, 219, 247)`
        } else if (c<.442) {
            return `rgb(246, 227, 212)`
        } else if (c<.47) {
            return `rgb(253, 216, 181)`
        } else {
            return `rgb(249, 209, 153)`
        }
    }
    // plains
    else if (c < .75) {
        if (c<.54) {
            return `rgb(198, 204, 81)`
        } else if (c<.58) {
            return `rgb(151, 193, 75)`
        } else if (c<.62) {
            return `rgb(128, 177, 69)`
        } else if (c<.66) {
            return `rgb(89, 149, 74)`
        } else if (c<.70) {
            return `rgb(68, 119, 65)`
        } else {
            return `rgb(49, 96, 51)`
        }
    }
    // mountains
    else {
        if (c<.80) {
            return `rgb(111, 65, 23)`
        } else if (c<.85) {
            return `rgb(57, 29, 0)`
        } else if (c<.90) {
            return `rgb(98, 91, 91)`
        } else if (c<.95) {
            return `rgb(79, 69, 73)`
        } else {
            return `rgb(62, 55, 62)`
        }
    }
}

function draw() {
    for (var x = 0; x < width; x += quality) {
        for (var y = 0; y < height; y += quality) {
            var c = (perlin2((x+posX)/zoom,(y+posY)/zoom)+1)/2;
            ctx.fillStyle = terrainColor(c);
            ctx.fillRect(x, y, quality, quality);
        }
    }
}

