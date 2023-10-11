class Plane {
    constructor(canvasId) {
        // Setting up canvas and its dimensions
        this.canvas = document.getElementById(canvasId);
        this.rect = this.canvas.getBoundingClientRect();
        this.width = this.canvas.width = this.rect.width;
        this.height = this.canvas.height = this.rect.height;
        this.ctx = this.canvas.getContext("2d");

        // Setting up base dimensions
        this.scale = 2;
        this.startx = this.width / 2 - 120 / this.scale;
        this.starty = this.height / 2 - 100 / this.scale;

        // Defining plane parts with their colors and coordinates for rendering
        this.parts = {
            outer: {
                color: 'rgb(119, 6, 24)',
                coords: [
                    [0, 60, 10, 20],
                    [10, 50, 50, 10],
                    [60, 40, 50, 10],
                    [100, 20, 10, 100],
                    [10, 80, 40, 10],
                    [50, 90, 30, 10],
                    [60, 80, 10, 10],
                    [80, 100, 30, 10],
                    [70, 70, 30, 10],
                    [110, 120, 10, 80],
                    [80, 190, 40, 10],
                    [90, 170, 30, 10],
                    [80, 180, 10, 10],
                    [240, 60, 10, 20],
                    [190, 50, 50, 10],
                    [140, 40, 50, 10],
                    [140, 20, 10, 100],
                    [200, 80, 40, 10],
                    [170, 90, 30, 10],
                    [180, 80, 10, 10],
                    [150, 100, 20, 10],
                    [150, 70, 30, 10],
                    [130, 120, 10, 80],
                    [130, 190, 40, 10],
                    [130, 170, 30, 10],
                    [160, 180, 10, 10],
                    [120, 200, 10, 10]
                ]
            },
            innerMain: {
                color: 'rgb(172, 50, 46)',
                coords: [
                    [10, 60, 90, 10],
                    [10, 70, 60, 10],
                    [50, 80, 10, 10],
                    [70, 80, 30, 10],
                    [80, 90, 20, 10],
                    [150, 60, 90, 10],
                    [180, 70, 60, 10],
                    [190, 80, 10, 10],
                    [150, 80, 30, 10],
                    [120, 20, 20, 20],
                    [130, 40, 10, 10],
                    [120, 100, 10, 60],
                    [90, 180, 20, 10]
                ]
            },
            innerHighlight: {
                color: 'rgb(216, 86, 101)',
                coords: [
                    [60, 50, 40, 10],
                    [150, 50, 40, 10],
                    [110, 20, 10, 30],
                    [110, 90, 10, 30],
                    [120, 160, 10, 20]
                ]
            },
            innerDarkHighlight: {
                color: 'rgb(140, 3, 8)',
                coords: [
                    [130, 90, 10, 30],
                    [150, 90, 20, 10],
                    [140, 180, 20, 10],
                    [120, 180, 10, 20]
                ]
            },
            aroundWindshield: {
                color: 'rgb(87, 1, 1)',
                coords: [
                    [120, 40, 10, 10],
                    [120, 90, 10, 10],
                    [110, 50, 10, 40],
                    [130, 50, 10, 40],
                    [140, 100, 10, 20]
                ]
            },
            windshield: {
                color: 'rgb(11, 160, 210)',
                coords: [
                    [120, 50, 10, 40]
                ]
            },
            propeller: {
                color: 'rgb(51, 51, 51)',
                coords: [
                    [110, 10, 30, 10],
                    [120, 0, 10, 10]
                ]
            },
            propellerBlades: {
                color: 'rgb(179, 179, 179)',
                coords: [
                    [80, 0, 40, 10],
                    [130, 0, 40, 10]
                ]
            }
        };
    }

    // Helper function to draw a rectangle with scaling
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.startx + x / this.scale, this.starty + y / this.scale, width / this.scale, height / this.scale);
    }

    // Main draw function to render the plane
    draw() {
        // Clearing the canvas before drawing
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Iterating over each plane part to draw it
        for (const partName in this.parts) {
            const part = this.parts[partName];
            for (const coord of part.coords) {
                this.drawRect(...coord, part.color);
            }
        }
    }

    // Function to rotate the plane
    rotate(angle) {
        this.ctx.restore();
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle);
        this.ctx.translate(-this.width / 2, -this.height / 2);
        this.draw();
    }

    // Function to change the color of a plane part
    setColor(partName, newColor) {
        if (this.parts[partName]) {
            this.parts[partName].color = newColor;
            this.draw();
        }
    }
}

// Instantiating the plane and drawing it for the first time
const plane = new Plane("planeCanvas");
// loading colors from local storage
let colors = localStorage.getItem("littlePlaneColors");
colors = colors.split(",");
colors = colors.slice(1); // remove null at start of array
for (let color of colors) {
    // later colors overwrites the previous ones
    let values = color.split(":");
    plane.setColor(values[0], values[1]);
    // overwrites the default values of color UI`
    document.getElementById(values[0]).value = values[1];
}
plane.draw();
