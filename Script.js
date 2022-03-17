var canvas= document.getElementById("canvas");
var rect = canvas.getBoundingClientRect();
var width = canvas.width = rect.width;
var height = canvas.height = rect.height;
var ctx = canvas.getContext("2d");

var posX = 0;
var posY = 0;

var seed = "default";
var seedInt = parseInt(SHA256(seed));

document.addEventListener('keydown', function(e) {
    if(e.key === 'w') {
        posY-=10;
    }
    if(e.key === 'a') {
        posX-=10;
    }
    if(e.key === 's') {
        posY+=10;
    }
    if(e.key === 'd') {
        posX+=10;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
});

function draw() {
    for (var x = posX; x < width/2 +posX; x += 10) {
        for (var y = posY; y < height/2 +posY; y += 10) {
            var c = (perlin2(x/100,y/100)+1)/2;
            ctx.fillStyle = `rgba(0,0,0,${c})`;
            ctx.fillRect(x, y, 10, 10);
        }
    }
}

