let canvas= document.getElementById("canvas");
let rect = canvas.getBoundingClientRect();
let width = canvas.width = rect.width;
let height = canvas.height = rect.height;
let ctx = canvas.getContext("2d");

// position of current screen
let posX = 0;
let posY = 0;
document.getElementById("coordinates").innerHTML = "Coordinates: X=" + posX + ", Y=" + posY;

// block size by pixel, i wouldn't recommend going under 5, load times will be longer
let quality = 10;
document.getElementById("quality").innerHTML = "Quality: " + quality + "px";

// speed at which the camera moves
let speed = 1;
document.getElementById("speed").innerHTML = "Speed: " + speed;

let color = 1;
document.getElementById("color").innerHTML = "Color: " + color;

// start every game with random seed
let seedVal = Math.floor(Math.random()*1000000);
seed(HashToNumber(SHA256(seedVal + "")));
document.getElementById("seed").innerHTML = "Seed: " + seedVal;

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
    for (let x = 0; x < width; x += quality) {
        for (let y = 0; y < height; y += quality) {
            // current perlin curve simulates sea level
            if (color === 0) {
                ctx.fillStyle = `rgba(0, 0, 0, ` + (perlin2((x + posX) / 300, (y + posY) / 300) + 1) / 2 + `)`;
            } else {
                let seaLevel = (perlin2((x+posX)/300,(y+posY)/300)+1)/2;
                //let temperature = (perlin2((x+posX)/300,(y+posY)/300)+1)/.5;
                //let humidity = (perlin2((x+posX)/300,(y+posY)/300)+1)/.5;
                ctx.fillStyle = terrainColor(seaLevel);
            }
            ctx.fillRect(x, y, quality, quality);
        }
    }
}

