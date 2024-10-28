class Speedometer extends BaseInstrument {
    constructor(canvasId) {
        super(canvasId);

        this.parts = {
            outerRing: {
                color: '#333333',
                coords: [
                    [-1 * -40, -1 * -80, -1 * 40, -1 * 80],
                    [-1 * -100, -1 * -60, -1 * 100, -1 * 40],
                    [-1 * -60, -1 * -100, -1 * 60, -1 * 80],
                    [-1 * -80, -1 * -80, -1 * 80, -1 * 60],
                ]
            },
            innerRing: {
                color: '#666666',
                coords: [
                    [-1 * -30, -1 * -70, -1 * 30, -1 * 70],
                    [-1 * -90, -1 * -50, -1 * 90, -1 * 30],
                    [-1 * -50, -1 * -90, -1 * 50, -1 * 70],
                    [-1 * -70, -1 * -70, -1 * 70, -1 * 50],
                ]
            },
            rangeIndicator1: {
                color: '#00ff00',
                coords: [
                    [-70, -15, -50, 5]
                ]
            },
            rangeIndicator2: {
                color: '#AAff00',
                coords: [
                    [-25, -40, -45, -20]
                ]
            },
            rangeIndicator3: {
                color: '#ffff00',
                coords: [
                    [-10, -50, 10, -30]
                ]
            },
            rangeIndicator4: {
                color: '#ffaa00',
                coords: [
                    [25, -40, 45, -20]
                ]
            },
            rangeIndicator5: {
                color: '#ff0000',
                coords: [
                    [50, -15, 70, 5]
                ]
            },
            needle: {
                color: '#ffffff',
                coords: []
            },
            centerCircle: {
                color: '#333333',
                coords: [
                    [-10, 20, 10, 40]
                ]
            }
        };

        this.needleState = 0;
        this.needleCoords = {
            0: [
                [-70, -5, -50, 5],
                [-50, 5, -30, 15],
                [-30, 15, -10, 25],
                [-10, 25, 10, 35],
                [10, 35, 20, 45]
            ],
            25: [
                [-35, -50, -45, -40],
                [-35, -20, -25, -40],
                [-15, -20, -25, 0],
                [-5, 0, -15, 20],
                [-5, 20, 5, 30],
                [5, 30, 15, 50]
            ],
            50: [
                [-5, -50, 5, 50]
            ],
            75: [
                [-1 * -35, -50, -1 * -45, -40],
                [-1 * -35, -20, -1 * -25, -40],
                [-1 * -15, -20, -1 * -25, 0],
                [-1 * -5, 0, -1 * -15, 20],
                [-1 * -5, 20, -1 * 5, 30],
                [-1 * 5, 30, -1 * 15, 50]
            ],
            100: [
                [-1 * -70, -5, -1 * -50, 5],
                [-1 * -50, 5, -1 * -30, 15],
                [-1 * -30, 15, -1 * -10, 25],
                [-1 * -10, 25, -1 * 10, 35],
                [-1 * 10, 35, -1 * 20, 45]
            ],
        }

        this.parts.needle.coords = this.needleCoords[this.needleState];

        this.draw();
    }

    draw() {
        super.drawInstrument();
    }
}

const speedometer = new Speedometer("speedometerCanvas");
speedometer.draw();

function updateSpeedometerNeedle(needleAnglePercent) {
    needleAnglePercent = Math.min(needleAnglePercent, 100);
    needleAnglePercent = Math.max(needleAnglePercent, 0);

    let stateCount = Object.keys(speedometer.needleCoords).length - 1;
    let needleState = stateCount * (needleAnglePercent / 100);
    needleState = Math.floor(needleState) * (100 / stateCount);

    speedometer.needleState = needleState;
    let needleCoords = speedometer.needleCoords[needleState];
    speedometer.parts.needle.coords = needleCoords;

    speedometer.draw();
}

