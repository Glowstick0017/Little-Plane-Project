# The Little Plane Project
![alt text](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/css/tlpp-icon.png?raw=true)
![image](https://user-images.githubusercontent.com/90464994/159108723-004caa45-a51c-471a-a8e3-bbd374bb9fb9.png)


`The little plane project` is a small passion project that I started based on my interest and curiosity on perlin noise and procedural generation. Rather than making a project in a prebuilt game engine like unity, I wanted to create my own engine from the ground up using only javascript and no external libraries (only using a prebuilt algorithm for SHA256 made by [Angel Marin](https://anmar.eu.org/) and [Paul Johnston](http://pajhome.org.uk/)). I made this project in javascript so that a majority of people can read and understand what's happening in the code (may not be too understandable since I have poor documentation, standards, and this is my first decently sized javascript project), as well as an extreme ease of access to a demo of the project to anyone that can use a browser. Credit also goes out to [Javidx9 or OneLoneCoder](https://github.com/OneLoneCoder) for their explanation on Perlin noise in the first 10 minutes of [this video](https://youtu.be/6-0UaeJBumA) which tremendously helped wrap my head around what Perlin noise is and how to go about my implementation. 

# Table of contents
- [Getting started](#getting-started)
- [Commands](#commands)
- [Roadmap](#roadmap)
- [License](#license)

# Getting started
Hi! Thank you for checking out `The little plane project`. Thus far there isnt much to do in the plane project but fly around and discover generated chunks that nobody has ever seen before. To get started visit the [play site](https://glowstick.me/tlpp/). You can move with either the `WASD` keys like any other game or you can use the arrow keys if you're oldschool. 

![image](https://user-images.githubusercontent.com/90464994/159105547-7c25a446-00e2-4da7-a5d9-fc8c283421b5.png?size=10)

To open the command box, hit your `Enter` key and you can use any of these commands to change your experience. I recommend using the seed command to generate a new world since the play site always starts on the same seed. Enjoy your time and please send any suggestions you have to Glowstick#0017 on discord or leave your suggestions [here](https://github.com/Glowstick0017/Little-Plane-Project/issues/new?assignees=&labels=new+feature&template=feature_request.md&title=Feature%20Request).

# Commands
| Command  | Description | Default value |
| ------------- | ------------- | ------------- |
| seed \<value>  | Generate a new world with the given seed. Any length of characters, words, or numbers can be entered for a unique world  | 0 |
| speed \<value>  | Set flight speed. Range 1-10  | 1 |
| quality \<value>  | Set rendering quality, the lower the more detailed. Anything below 10 will lag. Range 5-20  | 10 |
| teleport \<x> \<y>  | Teleport to specified coordinates  |  |

# Readmap
Upcoming features to be implemented
- [ ] biomes by using multile perlin planes to simulate different conditions including sea level, temperature, humidity...
- [ ] menu screen or esc menu
- [ ] command to change plane or color of plane
- [ ] user adjusted color values
- [ ] user feature suggestions

# License
Distributed under the MIT License. See [LICENSE](https://github.com/Glowstick0017/Little-Plane-Project/blob/master/LICENSE) for more information.
