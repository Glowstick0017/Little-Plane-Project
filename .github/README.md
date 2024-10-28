# The Little Plane Project
![alt text](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)
[![image](/.github/ISSUE_TEMPLATE/playbutton.png)](https://glowstick.me/tlpp/)

[![image](https://img.shields.io/badge/Live_build-darkgreen)](https://glowstick.me/tlpp/)
[![image](https://img.shields.io/badge/Snapshot-24w44a-yellow)](https://glowstick0017.github.io/Little-Plane-Project/index)

![image](https://img.shields.io/static/v1?label=Chrome&message=%E2%9C%94&color=success?style=social&logo=google-chrome&logoColor=white)
![image](https://img.shields.io/static/v1?label=Firefox&message=%E2%9C%94&color=success?style=social&logo=Firefox&logoColor=white)
![image](https://img.shields.io/static/v1?label=Microsoft%20Edge&message=%E2%9C%94&color=success?style=social&logo=Microsoft-edge&logoColor=white)
![image](https://img.shields.io/static/v1?label=Internet%20Explorer&message=%E2%9C%94&color=success?style=social&logo=Internet-Explorer&logoColor=white)
![image](https://img.shields.io/static/v1?label=Safari&message=%E2%9C%94&color=success?style=social&logo=Safari&logoColor=white)
![image](https://img.shields.io/static/v1?label=Mobile&message=In%20progress&color=critical)

## Introduction
`The little plane project` is a small passion project that I started based on my interest and curiosity on perlin noise and procedural generation. Rather than making a project in a prebuilt game engine like ~~Unity~~Godot(we don't like Unity around here anymore), I wanted to create my own engine from the ground up using only javascript and no external libraries (only using a prebuilt algorithm for SHA256 made by [Angel Marin](https://anmar.eu.org/) and [Paul Johnston](http://pajhome.org.uk/)). I made this project in javascript so that a majority of people can read and understand what's happening in the code (may not be too understandable since I have poor documentation, standards, and this is my first decently sized javascript project), as well as an extreme ease of access to a demo of the project to anyone that can use a browser. Credit also goes out to [Javidx9 or OneLoneCoder](https://github.com/OneLoneCoder) for their explanation on Perlin noise in the first 10 minutes of [this video](https://youtu.be/6-0UaeJBumA) which tremendously helped wrap my head around what Perlin noise is and how to go about my implementation. 

# Table of contents
- [Getting started](#getting-started--controls)
- [Commands](#commands)
- [Roadmap](#roadmap)
- [Run a local/dev copy](#how-to-run-a-development-copy-of-the-project)
- [Contributors](#contributors)
- [License](#license)

# Getting started & controls
Hi! Thank you for checking out `The little plane project`. Thus far there isnt much to do in the plane project but fly around and discover generated chunks that nobody has ever seen before. To get started visit the [play site](https://glowstick.me/tlpp/). You can move with either the `WASD` keys like any other game or you can use the arrow keys if you're oldschool. Up/Down changes your speed and Left/Right changes your direction.

![image](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/WASD.png?raw=true)
![image](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/arrowKeys.png?raw=true)

To open the command box, hit your `Enter` key and you can use any of these commands to change your experience. I recommend using the seed command to generate a new world since the play site always starts on the same seed. 

![image](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/enter.png?raw=true)

Enjoy your time and please send any suggestions you have to Glowstick#0017 on discord or leave your suggestions [here](https://github.com/Glowstick0017/Little-Plane-Project/issues/new?assignees=&labels=new+feature&template=feature_request.md&title=Feature%20Request).

# Commands
|      Command       | Description                                                                                                                   | Default value |
|:------------------:|-------------------------------------------------------------------------------------------------------------------------------|:-------------:|
|       color        | Toggle between full world color and gray scale to view underlying perlin plane                                                |       1       |
|  quality \<value>  | Set rendering quality, the lower the more detailed.  <br />Anything below 10 will lag. Range 5-20                             |      10       |
|   seed \<value>    | Generate a new world with the given seed. <br />Any length of characters, words, or numbers can be entered for a unique world |    random     |
|   speed \<value>   | Set flight speed. Range 1-10                                                                                                  |       1       |
| teleport \<x> \<y> <br/> tp \<x> \<y> | Teleport to specified coordinates                                                                          |      0 0      |


## Instructions within the Application
With the addition of the context menu thanks to jackwebdev, detailed instructions are available within the application itself, providing information on controls and command execution. These instructions enhance the user experience and understanding.

# Roadmap
Upcoming features to be implemented
- [ ] biomes by using multile perlin planes to simulate different conditions including sea level, temperature, humidity...
- [X] Instructions in context menu
- [ ] mobile controls (either joystick or click on displayed WASD)
- [ ] context menu friendly on mobile  
- [X] menu screen or esc menu
- [X] command to change plane or color of plane
- [X] user adjusted color values
- [ ] toggleable stats
- [X] color command that shows underlying perlin plane in black/white
- [ ] different worlds
- [ ] randomly spawned airports to refuel
- [ ] deliver packages from airports to others directed by arrow on screen
- [ ] user feature suggestions

# How to run a development copy of the project
This project was made to learn the concepts and technologies used as simple as possible, from how perlin noise works to simple javascript fundamentals.
The only thing you need to do to make and see your own changes in action is simply clone the repository, make your experimental changes to the code, and open index.html on your browser to view your changes.
If you made any changes you think would be helpful to add to the original repository, feel free to open a pull request. All proposed changes will be reviewed and whether or not they're added, there will be meaningful comments left to help support everyones learning journey.

# Contributors
Meet the talented individuals who have contributed to The Little Plane Project and learn how you can join them in [contributing to the project](CONTRIBUTING.md):

<a href="https://github.com/Glowstick0017/Little-Plane-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Glowstick0017/Little-Plane-Project" />
</a>

# License
Distributed under the MIT License. See [LICENSE](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/LICENSE) for more information.
