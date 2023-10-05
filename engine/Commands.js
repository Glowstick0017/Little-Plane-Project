// variable for if the command box is focused
let isfocused = false;

// variable for if we should fade out the result element
let fadeout = true;

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
            document.getElementById("seed").innerHTML = "Seed: " + newSeed;
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
                document.getElementById("speed").innerHTML = "Speed: " + speed;
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
                document.getElementById("quality").innerHTML = "Quality: " + quality + "px";
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
                posY = (-1)*Number(telArr[2])*10;
                draw();
                document.getElementById('result').value = "Teleported to " + telArr[1] + " " + telArr[2];
                document.getElementById("coordinates").innerHTML = "Coordinates: X=" + posX/10 + ", Y=" + (posY/10)*-1;
            }
        }
        // change the color of the world
        else if (command.toUpperCase() === "COLOR") {
            if (color === 0) {
                color = 1;
                document.getElementById('result').value = "Color on.";
                document.getElementById("color").innerHTML = "Color: " + color;
            } else {
                color = 0;
                document.getElementById('result').value = "Color off.";
                document.getElementById("color").innerHTML = "Color: " + color;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        }

        // list avaible commands
        else if (command.toUpperCase().startsWith("HELP")) {
            // make the box larger (temporarily)
            document.getElementById('result').style.height = "240px";

            // give the element some more time
            fadeout = false

            // check if the command was ran alone (just `help`)
            // or if user requested details about a certain one
            if(command.toUpperCase() === "HELP") {
                document.getElementById('result').value = `:) command list: \n 1. color \n 2. quality \n 3. seed \n 4. speed \n 5. teleport/tp \n\nYou can get more info on a speciffic one by using 'help <command_name>'`;
            } else {
                // get the command that the user wants to get info on
                const args = command.split(" ")
                var command_name = args[args.length - 1] // get the last command specified

                switch(command_name.toUpperCase()) {
                    case "COLOR":
                        document.getElementById('result').style.height = "75px";
                        document.getElementById('result').value = `Toggle between full world color and gray scale to view underlying perlin plane`
                        break;
                    case "QUALITY":
                        document.getElementById('result').style.height = "75px";
                        document.getElementById('result').value = `Set rendering quality, the lower the more detailed. Anything below 10 will lag. Range 5-20`
                        break;
                    case "SEED":
                        document.getElementById('result').style.height = "125px";
                        document.getElementById('result').value = `Generate a new world with the given seed. Any length of characters, words, or numbers can be entered for a unique world`
                        break;
                    case "SPEED":
                        document.getElementById('result').style.height = "25px";
                        document.getElementById('result').value = `Set flight speed. Range 1-10`
                        break;
                    case "TELEPORT":
                        document.getElementById('result').style.height = "50px";
                        document.getElementById('result').value = `Teleport to specified coordinates`
                        break;
                    case "TP":
                        document.getElementById('result').style.height = "50px";
                        document.getElementById('result').value = `Teleport to specified coordinates`
                        break;
                    default:
                        document.getElementById('result').style.height = "";
                        document.getElementById('result').value = `Invalid command.`
                }
            }

            // after 5 seconds, let the message fade out
            setTimeout(function() {
                fadeout = true;
            }, 5000);
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

    if(!fadeout) {
        // check every 0.1 second
        setTimeout(function() {
            fadeOutEffect();
        }, 100);

        // don't downgrade the opacity
        return;
    }

    let fadeEffect = setInterval(function () {
        if(!fadeout) {
            return
        }

        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            // if used the help command, reset the height
            if(fadeTarget.style.height !== "25px") {
                fadeTarget.style.height = "25px";
            }

            clearInterval(fadeEffect);
        }
    }, 500);
}