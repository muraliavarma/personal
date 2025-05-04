---
title: JS Rendering Pipeline
tags: ['JavaScript', 'Rendering']
image: /assets/gpu.png
sortOrder: 10
---

In this project, I created the rendering pipeline in JavaScript in a single HTML page. The user can change position of object and lights in 3D space through the browser and see results immediately. The steps involved are world transformation, lighting calculation, view transformation, perspective transformation, z-clipping, culling, z-sorting and resterization.

I use a library called Sylvester to do matrix calculations and Raphael for rasterization. The native HTML5 canvas element created blurry lines due to anti-aliasing. In the future, I plan to access pixel data and implement Bresenham's line drawing algorithm to render it in canvas.

Image here shows a screenshot of a 3D plane which is rendered as a series of pixels after going through the rendering pipeline. Click the Live Demo above to play with these values in real time. 