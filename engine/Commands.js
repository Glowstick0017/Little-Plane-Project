// variable for if the command box is focused
let isfocused = false;

// enter the command box
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !isfocused) {
        isfocused = true;
        document.getElementById('commandbox').focus();
    }
});

// list of commands
document.getElementById('commandbox').addEventListener('keyup', function (e) {
    if (e.key === 'Enter' && isfocused && document.getElementById('commandbox').value !== "") {
        // retrieve string entered from command box
        let command = document.getElementById('commandbox').value;

        // modify seed command, spawns you into the starting position of a new world
        if (command.toUpperCase().startsWith("SEED ")) {
            let newSeed = command.substring(5);
            seed(HashToNumber(SHA256(newSeed)));
            posX = 0;
            posY = 0;
            document.getElementById('result').value = "seed set to `" + newSeed + "`";
            draw();
        }
        // adjust speed of movement
        else if (command.toUpperCase().startsWith("SPEED")) {
            const speedArr = command.split(" ");
            if (speedArr.length !== 2 || isNaN(Number(speedArr[1])) || !Number.isInteger(Number(speedArr[1]))) {
                document.getElementById('result').value = "Invalid syntax `speed <speed>`";
            } else if (Number(speedArr[1]) > 10 || Number(speedArr[1]) < 1) {
                document.getElementById('result').value = "Invalid input. Range 1-10";
            } else {
                speed = Number(speedArr[1]);
                document.getElementById('result').value = "New speed set to " + speedArr[1];
            }
        }
        // adjust quality of the world
        else if (command.toUpperCase().startsWith("QUALITY")) {
            const qualArr = command.split(" ");
            if (qualArr.length !== 2 || isNaN(Number(qualArr[1])) || !Number.isInteger(Number(qualArr[1]))) {
                document.getElementById('result').value = "Invalid syntax `quality <quality>`";
            } else if (Number(qualArr[1]) > 20 || Number(qualArr[1]) < 5) {
                document.getElementById('result').value = "Invalid input. Range 5-20";
            } else {
                quality = Number(qualArr[1]);
                draw();
                document.getElementById('result').value = "Quality set to " + qualArr[1];
            }
        }
        // teleport to coordinates in the current world
        else if (command.toUpperCase().startsWith("TELEPORT") || command.toUpperCase().startsWith("TP")) {  // alias 'tp' and 'teleport'
            const telArr= command.split(" ");
            if (telArr.length !== 3 || isNaN(Number(telArr[1])) || !Number.isInteger(Number(telArr[1]))
                || isNaN(Number(telArr[2])) || !Number.isInteger(Number(telArr[2]))) {
                document.getElementById('result').value = "Invalid syntax `teleport <x> <y>`";
            } else {
                posX = Number(telArr[1])*10;
                posY = Number(telArr[2])*10;
                draw();
                document.getElementById('result').value = "Teleported to " + telArr[1] + " " + telArr[2];
            }
        }
        // teleport to coordinates in the current world
        else if (command.toUpperCase() === "COLOR") {
            if (color === 0) {
                color = 1;
                document.getElementById('result').value = "Color on.";
            } else {
                color = 0;
                document.getElementById('result').value = "Color off.";
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        }
        // adjust plane color
        else if (command.toUpperCase().startsWith("PLANE_COLOR")) {
            const colorArr = command.split(" ");
            if (colorArr.length !== 2) {
                document.getElementById('result').value = "Invalid syntax `plane_color <color>`";
            } else {
                const color = colorArr[1].toLowerCase();
                if (color === "red" || color === "green" || color === "blue" || color === "gray") {
                    // Update the plane color based on the input
                    planeColor = color;
                    document.getElementById('result').value = "Plane color set to " + color;
                    drawPlane();
                } else {
                    document.getElementById('result').value = "Invalid plane color. Choose from red, green, blue, or gray.";
                }
            }
        }
        // invalid command // command not found
        else {
            document.getElementById('result').value = "Invalid command.";
        }
        fadeOutEffect()
        document.getElementById('commandbox').blur();
        document.getElementById('commandbox').value = "";
        isfocused=false;
    }
    // escape command focus
    if (e.key === 'Esc' || e.key === 'Escape') {
        document.getElementById('commandbox').blur();
        document.getElementById('commandbox').value = "";
        isfocused=false;
    }
});

document.getElementById('commandbox').addEventListener('blur', function() {
    isfocused = false;
})

// fade out for result of command
function fadeOutEffect() {
    let fadeTarget = document.getElementById('result');
    fadeTarget.style.opacity = 1;
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 500);
}