var isfocused = false;


// THIS NEEDS TO BE FIXED
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !isfocused) {
        isfocused = true;
        document.getElementById('commandbox').focus();
    }
});

document.getElementById('commandbox').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && isfocused) {
        let command = document.getElementById('commandbox').value;
        if (command.startsWith("seed ")) {
            let newSeed = command.substring(5);
            seed(HashToNumber(SHA256(newSeed)));
            document.getElementById('result').value = "seed set to " + newSeed;
            draw();
        } else {
            document.getElementById('result').value = "Invalid command.";
        }
        fadeOutEffect()
        document.getElementById('commandbox').blur();
        document.getElementById('commandbox').value = "";
        isfocused=false;
    }
});

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
    }, 300);
}