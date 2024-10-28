class BaseInstrument {
    constructor(canvasId) {
        // Setting up canvas and its dimensions
        /** @type {HTMLCanvasElement} */
        this.canvas = document.getElementById(canvasId);
        this.rect = this.canvas.getBoundingClientRect();
        this.width = this.canvas.width = this.rect.width;
        this.height = this.canvas.height = this.rect.height;
        this.ctx = this.canvas.getContext("2d");

        // Defining parts with their colors and coordinates for rendering
        this.parts = {};

        // Offsets for the instruments
        this.shiftX = 0;
        this.shiftY = 0;
    }

    // Helper function to draw a rectangle with scaling
    drawRect(x, y, width, height, color) {
        this.ctx.translate(this.width / 2 + this.shiftX, this.height + this.shiftY);
        this.ctx.scale(0.5, 0.5);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.scale(2, 2);
        this.ctx.translate(-(this.width / 2 + this.shiftX), -(this.height + this.shiftY));
    }

    drawInstrument() {
        // Adjust the canvas so that element comes in center and bottom
        this.shiftY = 0;

        for (const partName in this.parts) {
            const part = this.parts[partName];
            for (const coord of part.coords) {
                let [y1, y2] = [coord[1], coord[3]];
                this.shiftY = -Math.max(-this.shiftY, y1, y2);
            }
        }

        // Iterating over each plane part to draw it
        for (const partName in this.parts) {
            const part = this.parts[partName];
            for (const coord of part.coords) {
                let [x1, y1, x2, y2] = coord;

                let x = Math.min(x1, x2);
                let y = Math.min(y1, y2);
                let w = Math.abs(x2 - x1);
                let h = Math.abs(y2 - y1);
                
                this.drawRect(x, y, w, h, part.color);
            }
        }
    }

    // Main draw function to render the plane
    draw() {
        // Clearing the canvas before drawing
        this.ctx.clearRect(0, 0, this.width, this.height);

        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.rotate(this.angle);
        // this.ctx.translate(-this.width / 2, -this.height / 2);
        this.drawInstrument();
        this.ctx.resetTransform();
    }
    
    // Function to change the color of a plane part
    setColor(partName, newColor) {
        if (this.parts[partName]) {
            this.parts[partName].color = newColor;
            this.draw();
        }
    }

    resetDefaults() {
        document.getElementById("outer").value = this.parts["outer"].color = '#770619';
        document.getElementById("innerMain").value = this.parts["innerMain"].color = '#ac322e';
        document.getElementById("innerHighlight").value = this.parts["innerHighlight"].color = '#d85665';
        document.getElementById("innerDarkHighlight").value = this.parts["innerDarkHighlight"].color = '#8c0308';
        document.getElementById("aroundWindshield").value = this.parts["aroundWindshield"].color = '#570101';
        document.getElementById("windshield").value = this.parts["windshield"].color = '#0ba0d2';
        document.getElementById("propeller").value = this.parts["propeller"].color = '#333333';
        document.getElementById("propellerBlades").value = this.parts["propellerBlades"].color = '#b3b3b3';
        this.draw();
    }
}

