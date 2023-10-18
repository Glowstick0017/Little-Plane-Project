# The Little Plane Project
![alt text](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)
[![image](/.github/ISSUE_TEMPLATE/playbutton.png)](https://glowstick.me/tlpp/)

[![image](https://img.shields.io/badge/Live_build-darkgreen)](https://glowstick.me/tlpp/)
[![image](https://img.shields.io/badge/Snapshot-23w42a-yellow)](https://glowstick0017.github.io/Little-Plane-Project/index)

![image](https://img.shields.io/static/v1?label=Chrome&message=%E2%9C%94&color=success?style=social&logo=google-chrome&logoColor=white)
![image](https://img.shields.io/static/v1?label=Firefox&message=%E2%9C%94&color=success?style=social&logo=Firefox&logoColor=white)
![image](https://img.shields.io/static/v1?label=Microsoft%20Edge&message=%E2%9C%94&color=success?style=social&logo=Microsoft-edge&logoColor=white)
![image](https://img.shields.io/static/v1?label=Internet%20Explorer&message=%E2%9C%94&color=success?style=social&logo=Internet-Explorer&logoColor=white)
![image](https://img.shields.io/static/v1?label=Safari&message=%E2%9C%94&color=success?style=social&logo=Safari&logoColor=white)
![image](https://img.shields.io/static/v1?label=Mobile&message=In%20progress&color=critical)

![The Little Plane Project](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)

[![Play](/.github/ISSUE_TEMPLATE/playbutton.png)](https://glowstick.me/tlpp/)
[![Live Build](https://img.shields.io/badge/Live_build-darkgreen)](https://glowstick.me/tlpp/)
[![Snapshot](https://img.shields.io/badge/Snapshot-23w41b-yellow)](https://glowstick0017.github.io/Little-Plane-Project/index)

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started--controls)
- [Commands](#commands)
- [Instructions within the Application](#instructions-within-the-application)
- [Roadmap](#roadmap)
- [Run a Local/Dev Copy](#how-to-run-a-development-copy-of-the-project)
- [Contributing](#contributing)
- [Code Documentation](#code-documentation)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction
"The Little Plane Project" is a small passion project exploring Perlin noise and procedural generation. This project is unique as it is developed from the ground up using only JavaScript, offering transparency and accessibility to a wider audience. Whether you are interested in the underlying code or want to explore generated worlds, this project is designed for both curiosity and enjoyment.

## Getting Started & Controls
Welcome to "The Little Plane Project"! Currently, the main activity is exploring generated chunks. Visit the [play site](https://glowstick.me/tlpp/) to get started. You can navigate using the `WASD` keys or the arrow keys for a classic experience.

![WASD Controls](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/WASD.png?raw=true)
![Arrow Keys](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/arrowKeys.png?raw=true)

To access the command box, press `Enter`, and execute various commands to customize your experience. Consider using the seed command to generate a new world, as the play site always starts with the same seed.

![Command Box](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/enter.png?raw=true)

Enjoy your time, and share your suggestions with Glowstick#0017 on Discord or submit them [here](https://github.com/Glowstick0017/Little-Plane-Project/issues/new?assignees=&labels=new+feature&template=feature_request.md&title=Feature%20Request).

## Commands
| Command | Description | Default Value |
|:-------:|-------------|:-------------:|
| color | Toggle between full world color and grayscale to view the underlying Perlin plane | 1 |
| quality \<value> | Set rendering quality; lower values are more detailed. Range: 5-20 | 10 |
| seed \<value> | Generate a new world with the given seed. Any characters, words, or numbers for a unique world | random |
| speed \<value> | Set flight speed. Range: 1-10 | 1 |
| teleport \<x> \<y> <br/> tp \<x> \<y> | Teleport to specified coordinates | 0 0 |

## Instructions within the Application
With the addition of the context menu thanks to jackwebdev, detailed instructions are available within the application itself, providing information on controls and command execution. These instructions enhance the user experience and understanding.

## Roadmap
Upcoming features:
- [ ] Biomes using multiple Perlin planes to simulate different conditions (e.g., sea level, temperature, humidity)
- [X] Instructions in context menu
- [ ] Mobile controls (joystick or click on displayed WASD)
- [ ] Context menu mobile optimization
- [X] Menu screen or ESC menu
- [X] Command to change plane or color of the plane
- [X] User-adjusted color values
- [ ] Toggleable stats
- [X] Color command showing underlying Perlin plane in black/white
- [ ] Different worlds
- [ ] Randomly spawned airports for refueling
- [ ] Deliver packages from airports to others directed by an arrow on the screen
- [ ] User feature suggestions

## How to Run a Development Copy of the Project
This project simplifies concepts and technologies for easy learning. Clone the repository, make your changes, and open index.html in your browser to view them. Feel free to open a pull request for any helpful changes, and detailed comments will be provided to support learning.

## Contributing
We welcome contributions to "The Little Plane Project." Whether it's bug fixes, new features, or improvements, your input is valuable. Before contributing, please review our [Contribution Guidelines](CONTRIBUTING.md).

## Code Documentation
To facilitate understanding for beginners, the code includes detailed comments and documentation for methods and functions. If you have any questions or need further clarification, please reach out.

## Troubleshooting
If you encounter issues while using the project, check our troubleshooting guide in [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for solutions to common problems.

## License
Distributed under the MIT License. See [LICENSE](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/LICENSE) for more information.

## Acknowledgments
Special thanks to [Javidx9 or OneLoneCoder](https://github.com/OneLoneCoder) for their insights on Perlin noise. We also appreciate the contributions of [Angel Marin](https://anmar.eu.org/) and [Paul Johnston](http://pajhome.org.uk/) for their SHA256 algorithm. Additionally, we thank our contributors for their valuable input.
