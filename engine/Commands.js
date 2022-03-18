// variable for if the command box is focused
var isfocused = false;

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
        if (command.startsWith("seed ")) {
            let newSeed = command.substring(5);
            seed(HashToNumber(SHA256(newSeed)));
            posX = 0;
            posY = 0;
            document.getElementById('result').value = "seed set to " + newSeed;
            draw();
        }
        // adjust speed of movement
        else if (command.startsWith("speed")) {
            const speedArr = command.split(" ");
            if (speedArr.length !== 2 || isNaN(Number(speedArr[1])) || !Number.isInteger(Number(speedArr[1]))) {
                document.getElementById('result').value = "Invalid syntax `speed <speed>`";
            } else if (Number(speedArr[1]) > 10 || Number(speedArr[1]) < 1) {
                document.getElementById('result').value = "Invalid input. Range 1-10";
            } else {
                speed = speedArr[1];
                document.getElementById('result').value = "New speed set to " + speedArr[1];
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

// fade out for result of command
function fadeOutEffect() {
    var fadeTarget = document.getElementById('result');
    fadeTarget.style.opacity = 1;
    var fadeEffect = setInterval(function () {
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