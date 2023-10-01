// pixel plane sprite
let planeCanvas = document.getElementById("planeCanvas");
let planerect = canvas.getBoundingClientRect();
let planewidth = planeCanvas.width = planerect.width;
let planeheight = planeCanvas.height = planerect.height;
let planectx = planeCanvas.getContext("2d");

drawPlane();

planectx.save();

function drawPlane() {
    let scale = 2;
    let startx = planewidth/2 - 120/scale;
    let starty = planeheight/2 - 100/scale;

    planectx.clearRect(0,0,planewidth,planeheight);

    //outter
    planectx.fillStyle = 'rgb(119, 6, 24)';
    planectx.fillRect(startx, starty+(60/scale), 10/scale, 20/scale);
    planectx.fillRect(startx+10/scale, starty+50/scale, 50/scale, 10/scale);
    planectx.fillRect(startx+60/scale, starty+40/scale, 50/scale, 10/scale);
    planectx.fillRect(startx+100/scale, starty+20/scale, 10/scale, 100/scale);
    planectx.fillRect(startx+10/scale, starty+80/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+50/scale, starty+90/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+60/scale, starty+80/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+80/scale, starty+100/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+70/scale, starty+70/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+110/scale, starty+120/scale, 10/scale, 80/scale);
    planectx.fillRect(startx+80/scale, starty+190/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+90/scale, starty+170/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+80/scale, starty+180/scale, 10/scale, 10/scale);

    planectx.fillRect(startx+240/scale, starty+60/scale, 10/scale, 20/scale);
    planectx.fillRect(startx+190/scale, starty+50/scale, 50/scale, 10/scale);
    planectx.fillRect(startx+140/scale, starty+40/scale, 50/scale, 10/scale);
    planectx.fillRect(startx+140/scale, starty+20/scale, 10/scale, 100/scale);
    planectx.fillRect(startx+200/scale, starty+80/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+170/scale, starty+90/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+180/scale, starty+80/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+150/scale, starty+100/scale, 20/scale, 10/scale);
    planectx.fillRect(startx+150/scale, starty+70/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+130/scale, starty+120/scale, 10/scale, 80/scale);
    planectx.fillRect(startx+130/scale, starty+190/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+130/scale, starty+170/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+160/scale, starty+180/scale, 10/scale, 10/scale);

    planectx.fillRect(startx+120/scale, starty+200/scale, 10/scale, 10/scale);

    //inner main
    planectx.fillStyle = 'rgb(172, 50, 46)';
    planectx.fillRect(startx+10/scale, starty+60/scale, 90/scale, 10/scale);
    planectx.fillRect(startx+10/scale, starty+70/scale, 60/scale, 10/scale);
    planectx.fillRect(startx+50/scale, starty+80/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+70/scale, starty+80/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+80/scale, starty+90/scale, 20/scale, 10/scale);
    planectx.fillRect(startx+150/scale, starty+60/scale, 90/scale, 10/scale);
    planectx.fillRect(startx+180/scale, starty+70/scale, 60/scale, 10/scale);
    planectx.fillRect(startx+190/scale, starty+80/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+150/scale, starty+80/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+120/scale, starty+20/scale, 20/scale, 20/scale);
    planectx.fillRect(startx+130/scale, starty+40/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+120/scale, starty+100/scale, 10/scale, 60/scale);
    planectx.fillRect(startx+90/scale, starty+180/scale, 20/scale, 10/scale);

    //inner highlight
    planectx.fillStyle = 'rgb(216, 86, 101)';
    planectx.fillRect(startx+60/scale, starty+50/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+150/scale, starty+50/scale, 40/scale, 10/scale);
    planectx.fillRect(startx+110/scale, starty+20/scale, 10/scale, 30/scale);
    planectx.fillRect(startx+110/scale, starty+90/scale, 10/scale, 30/scale);
    planectx.fillRect(startx+120/scale, starty+160/scale, 10/scale, 20/scale);

    //inner dark highlight
    planectx.fillStyle = 'rgb(140, 3, 8)';
    planectx.fillRect(startx+130/scale, starty+90/scale, 10/scale, 30/scale);
    planectx.fillRect(startx+150/scale, starty+90/scale, 20/scale, 10/scale);
    planectx.fillRect(startx+140/scale, starty+180/scale, 20/scale, 10/scale);
    planectx.fillRect(startx+120/scale, starty+180/scale, 10/scale, 20/scale);

    //around windshield
    planectx.fillStyle = 'rgb(87, 1, 1)';
    planectx.fillRect(startx+120/scale, starty+40/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+120/scale, starty+90/scale, 10/scale, 10/scale);
    planectx.fillRect(startx+110/scale, starty+50/scale, 10/scale, 40/scale);
    planectx.fillRect(startx+130/scale, starty+50/scale, 10/scale, 40/scale);
    planectx.fillRect(startx+140/scale, starty+100/scale, 10/scale, 20/scale);

    //windshield
    planectx.fillStyle = 'rgb(11, 160, 210)';
    planectx.fillRect(startx+120/scale, starty+50/scale, 10/scale, 40/scale);

    //propeller
    planectx.fillStyle = 'rgb(51, 51, 51)';
    planectx.fillRect(startx+110/scale, starty+10/scale, 30/scale, 10/scale);
    planectx.fillRect(startx+120/scale, starty, 10/scale, 10/scale);

    //propeller blades
    planectx.fillStyle = 'rgb(179, 179, 179)';
    planectx.fillRect(startx+80/scale, starty, 40/scale, 10/scale);
    planectx.fillRect(startx+130/scale, starty, 40/scale, 10/scale);
}

function planeRotate(angle) {
    planectx.restore();
    planectx.save();
    planectx.translate(planewidth/2, planeheight/2);
    planectx.rotate(angle);
    planectx.translate(-planewidth/2, -planeheight/2);
    drawPlane();
}