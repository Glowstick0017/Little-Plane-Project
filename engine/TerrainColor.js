/**
 * Determines the appropriate terrain color based on the value of c.
 *
 * @param {number} c - The terrain coefficient, typically between 0 and 1.
 * @param {object|string} [terrainConfig=defaultTerrains] - The terrain configuration object or its JSON representation.
 * @returns {string} - The RGB color value for the terrain.
 */
function terrainColor(c, terrainConfig = defaultTerrains) {
    let terrains;

    // Check if the provided config is JSON, if so, parse it.
    if (typeof terrainConfig === "string") {
        try {
            terrains = JSON.parse(terrainConfig);
        } catch (e) {
            throw new Error("Invalid JSON provided for terrainConfig");
        }
    } else if (typeof terrainConfig === "object") {
        terrains = terrainConfig;
    } else {
        throw new Error("Invalid terrainConfig provided. Expected JSON string or object.");
    }

    for (let terrain of terrains) {
        if (c >= terrain.range[0] && c < terrain.range[1]) {
            for (let colorStop of terrain.colors) {
                if (c < colorStop.limit) {
                    return colorStop.value;
                }
            }
        }
    }
}

const defaultTerrains = [
    {
        name: "sea",
        range: [0, 0.33],
        colors: [
            { limit: 0.055, value: 'rgb(0, 15, 44)' },
            { limit: 0.110, value: 'rgb(0, 31, 60)' },
            { limit: 0.165, value: 'rgb(3, 55, 81)' },
            { limit: 0.220, value: 'rgb(14, 78, 106)' },
            { limit: 0.275, value: 'rgb(23, 93, 119)' },
            { limit: 0.33, value: 'rgb(37, 107, 133)' }
        ]
    },
    {
        name: "beach",
        range: [0.33, 0.5],
        colors: [
            { limit: 0.358, value: 'rgb(100, 171, 227)' },
            { limit: 0.386, value: 'rgb(146, 196, 238)' },
            { limit: 0.414, value: 'rgb(187, 219, 247)' },
            { limit: 0.442, value: 'rgb(246, 227, 212)' },
            { limit: 0.47, value: 'rgb(253, 216, 181)' },
            { limit: 0.5, value: 'rgb(249, 209, 153)' }
        ]
    },
    {
        name: "plains",
        range: [0.5, 0.75],
        colors: [
            { limit: 0.54, value: 'rgb(198, 204, 81)' },
            { limit: 0.58, value: 'rgb(151, 193, 75)' },
            { limit: 0.62, value: 'rgb(128, 177, 69)' },
            { limit: 0.66, value: 'rgb(89, 149, 74)' },
            { limit: 0.70, value: 'rgb(68, 119, 65)' },
            { limit: 0.75, value: 'rgb(49, 96, 51)' }
        ]
    },
    {
        name: "mountains",
        range: [0.75, 1],
        colors: [
            { limit: 0.80, value: 'rgb(111, 65, 23)' },
            { limit: 0.85, value: 'rgb(57, 29, 0)' },
            { limit: 0.90, value: 'rgb(98, 91, 91)' },
            { limit: 0.95, value: 'rgb(79, 69, 73)' },
            { limit: 1, value: 'rgb(62, 55, 62)' }
        ]
    }
];

