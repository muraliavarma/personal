---
title: YouSpot
tags: ['AngularJS', 'NodeJS', 'Spotify']
image: /assets/youspot.png
urlLink: https://chrome.google.com/webstore/detail/youspot/bojlgkgcbdcldkhjjapllgncgdgalhfj
urlText: Chrome Web Store
sortOrder: 6
---

I listen to a lot of YouTube song mixes to discover new music. But of the 20 odd tracks in the video, I usually like only a couple of them. So, I created this chrome extension which parses YouTube page data and adds them to your Spotify playlist of choice.

During this project, I had to find solutions for problems that I had never faced before. Dealing with CORS, especially in the Chrome Extension context was quite chalenging. This was also the first time I had used an OAuth flow (for Spotify Integration).

Image here shows a screenshot of a YouTube page with the YouSpot extension overlaid on the right side. The extension shows the songs that were parsed from the page that match a song name in Spotify. I chose most of the songs (green = selected, grey = unselected) and added them to one of my existing (or new) playlist in Spotify. 