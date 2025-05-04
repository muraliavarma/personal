---
title: Kinect Soccer
tags: ['C++', 'MS Kinect', 'OpenGL']
image: /assets/kinect.png
sortOrder: 9
---

This is a graduate special problem that I did to track finger position using Microsoft Kinect (and OpenNI) and simulate soccer with it. Fingers are tracked using their position in 3D space (with depth information tracked by Kinect IR sensors). The slope of fingers is calculated in XY and YZ planes by approximation of an over-constrained problem.

This is then rendered in 3D through OpenGL. One of the challenges that I faced was that the Kinect provided gave high confidence values to depth information. I had to use neighboring pixel values to calculate my own confidence values so as to reduce jittering.

Image here shows a screenshot of the different states by which the RGB and depth info of the fingers is translated into fake legs in the 3D world 