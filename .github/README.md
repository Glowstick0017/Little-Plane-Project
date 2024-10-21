# The Little Plane Project
![The Little Plane Project Icon](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)

[![Play Now](https://img.shields.io/badge/Play-Now-darkgreen)](https://glowstick.me/tlpp/) [![Snapshot](https://img.shields.io/badge/Snapshot-24w40a-yellow)](https://glowstick0017.github.io/Little-Plane-Project/index)

![Supported Browsers](https://img.shields.io/static/v1?label=Chrome&message=%E2%9C%94&color=success&style=social&logo=google-chrome)
![Supported Browsers](https://img.shields.io/static/v1?label=Firefox&message=%E2%9C%94&color=success&style=social&logo=firefox)
![Supported Browsers](https://img.shields.io/static/v1?label=Edge&message=%E2%9C%94&color=success&style=social&logo=microsoft-edge)
![Supported Browsers](https://img.shields.io/static/v1?label=Safari&message=%E2%9C%94&color=success&style=social&logo=safari)
![Mobile](https://img.shields.io/static/v1?label=Mobile&message=In%20Progress&color=red)

## Introduction
**The Little Plane Project** is a 2D procedural generation flying game where you can control a small plane exploring an infinite world. Built purely with JavaScript, HTML, and CSS, it aims to be an educational resource for understanding procedural generation, Perlin noise, and basic game development. 

The project started as a personal challenge to build a game engine from scratch instead of using existing engines like Unity or Godot, using only vanilla JavaScript for simplicity and transparency. Credit goes to [Javidx9](https://github.com/OneLoneCoder) for their explanation of Perlin noise, which inspired the terrain generation system.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Game Controls](#game-controls)
- [Commands](#commands)
- [Roadmap](#roadmap)
- [Running a Development Copy](#running-a-development-copy)
- [Code Structure](#code-structure)
- [Contributors](#contributors)
- [License](#license)

## Features
- **Infinite World Generation:** Explore procedurally generated terrains using Perlin noise.
- **Customizable Settings:** Modify rendering quality, flight speed, plane color, and other settings.
- **Dynamic Commands:** Use in-game commands to generate worlds, change settings, and teleport.
- **Responsive UI:** Includes a context menu with detailed instructions and easy-to-use controls.
- **Cross-Browser Support:** Compatible with all modern desktop browsers.
- **Accessible Codebase:** Simple JavaScript structure allows anyone to learn or contribute.

## Demo
Try out the game directly in your browser: [Play Now](https://glowstick.me/tlpp/).

## Getting Started
You can start playing the game by visiting the [play site](https://glowstick.me/tlpp/). The controls are easy to grasp, using either `WASD` or arrow keys to navigate the plane.

![WASD Controls](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/WASD.png?raw=true)
![Arrow Key Controls](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/arrowKeys.png?raw=true)

To open the command box, press the `Enter` key and type any of the available commands to modify the game experience. The default seed always generates the same world; use the seed command to generate a new, unique world.

## Game Controls
- **Move Forward:** `W` or `ArrowUp`
- **Rotate Left:** `A` or `ArrowLeft`
- **Rotate Right:** `D` or `ArrowRight`
- **Increase Altitude:** `U`
- **Decrease Altitude:** `J`
- **Toggle Flight Mode:** `E` (Switch between manual and constant flight)
- **Dash:** `Space` (Speed boost with cooldown)
- **Pause/Resume:** `P`

## Commands
Commands can be accessed via the command box (`Enter` key). Here’s a list of commands to modify your gameplay experience:

| Command                     | Description                                                                                                  | Default Value |
|-----------------------------|--------------------------------------------------------------------------------------------------------------|---------------|
| `color`                     | Toggle between full-color mode and grayscale to view underlying Perlin noise.                                 | 1             |
| `quality <value>`           | Set rendering quality. The lower the value, the higher the detail. Recommended range: 5-20.                  | 10            |
| `seed <value>`              | Generate a new world with a custom seed. Any string input will generate a unique world.                      | Random        |
| `speed <value>`             | Adjust the plane's flight speed. Range: 1-10.                                                                | 1             |
| `teleport <x> <y>` or `tp`  | Instantly move to the specified coordinates.                                                                 | 0 0           |

## Roadmap
Future enhancements to be implemented:
- [ ] Biomes: Simulate various terrains using multiple Perlin planes (e.g., sea level, temperature).
- [ ] Mobile Controls: Add joystick or on-screen controls for touchscreen devices.
- [ ] User Interface Enhancements: Improve context menu for better mobile compatibility.
- [ ] In-Game Stats: Add a HUD to display flight stats and other information.
- [ ] Procedural World Variations: Introduce different world types and randomly generated airports.
- [ ] Mission System: Add delivery missions between airports.
- [ ] Community Suggestions: Incorporate user-requested features and improvements.

## Running a Development Copy
To run a development version of the project locally:
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Glowstick0017/Little-Plane-Project.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd Little-Plane-Project
   ```
3. **Open `index.html` in Your Browser**
   - Simply open the file in a modern browser.
   - Optionally, start a local server using Python for a more stable environment:
     ```bash
     python -m http.server 8000
     ```
   - Visit `http://localhost:8000` in your browser.

4. **Modify the Code**
   - Make changes in `script.js` or other files, and refresh the browser to see the updates.

## Code Structure
The project is structured to be beginner-friendly:

- **`index.html`**: Entry point that defines the game canvas.
- **`style.css`**: Styling for the game interface.
- **`script.js`**: Main game logic, including input handling, rendering, and procedural generation.
- **Command Handling**: Commands are managed dynamically in `script.js` using the command box.

### Key Components
1. **Game Loop:** Uses `requestAnimationFrame` to handle rendering and state updates.
2. **Perlin Noise Generation:** Manages terrain generation and world variation.
3. **User Input Handling:** Listeners detect `keydown` and `keyup` events to control the plane.
4. **Command Parsing:** The command box accepts various inputs for customizing the gameplay experience.

## Contributors
Meet the contributors who helped make this project possible! Interested in joining? Check out the [Contributing Guidelines](CONTRIBUTING.md).

<a href="https://github.com/Glowstick0017/Little-Plane-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Glowstick0017/Little-Plane-Project" />
</a>

## License
The Little Plane Project is distributed under the MIT License. See the [LICENSE](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/LICENSE) file for more information.
