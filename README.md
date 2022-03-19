# The Little Plane Project
![alt text](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)

`The little plane project` is a small passion project that I started based on my interest and curiosity on perlin noise and procedural generation. Rather than making a project in a prebuilt game engine like unity, I wanted to create my own engine from the ground up using only javascript and no external libraries (only using a prebuilt algorithm for SHA256 made by [Angel Marin](https://anmar.eu.org/) and [Paul Johnston](http://pajhome.org.uk/)). I made this project in javascript so that a majority of people can read and understand what's happening in the code (may not be too understandable since I have poor documentation, standards, and this is my first decently sized javascript project), as well as an extreme ease of access to a demo of the project to anyone that can use a browser. Credit also goes out to [Javidx9 or OneLoneCoder](https://github.com/OneLoneCoder) for their explanation on Perlin noise in the first 10 minutes of [this video](https://youtu.be/6-0UaeJBumA) which tremendously helped wrap my head around what Perlin noise is and how to go about my implementation. 

# Table of contents
- [Commands](#commands)

# Commands
| Command  | Description | Default value |
| ------------- | ------------- | ------------- |
| seed \<value>  | Generate a new world with the given seed  | 0 |
| speed \<value>  | Set flight speed. Range 1-10  | 1 |
| quality \<value>  | Set rendering quality, the lower the more detailed. Anything below 10 will lag. Range 5-20  | 10 |
| teleport \<x> \<y>  | Teleport to specified coordinates  |  |
