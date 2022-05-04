var canvas= document.getElementById("canvas");
var rect = canvas.getBoundingClientRect();
var width = canvas.width = rect.width;
var height = canvas.height = rect.height;
var ctx = canvas.getContext("2d");

// position of current screen
var posX = 0;
var posY = 0;

// block size by pixel, i wouldn't recommend going under 5 load times will be longer
var quality = 10;

// speed at which the camera moves
var speed = 1;

var color = 1;

// initial draw
draw();

/** zoom feature that doesn't work well yet
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

function draw() {
    for (var x = 0; x < width; x += quality) {
        for (var y = 0; y < height; y += quality) {
            // current perlin curve simulates sea level
            if (color == 0) {
                var c = `rgba(0, 0, 0, ` + (perlin2((x+posX)/300,(y+posY)/300)+1)/2 + `)`
                ctx.fillStyle = c;
            } else {
                var seaLevel = (perlin2((x+posX)/300,(y+posY)/300)+1)/2;
                //var temperature = (perlin2((x+posX)/300,(y+posY)/300)+1)/.5;
                //var humidity = (perlin2((x+posX)/300,(y+posY)/300)+1)/.5;
                ctx.fillStyle = terrainColor(seaLevel);
            }
            ctx.fillRect(x, y, quality, quality);
        }
    }
}

