---
title: Multi-Provider Social Auth & Email System
tags: ['PassportJS', 'AWS', 'SES', 'VueJS', 'NodeJS']
image: /assets/passport.jpg
sortOrder: 16
---

This website uses multiple social platforms for logging into the application including Facebook, Google and Twitch. I used PassportJS and NodeJS to accomplish the Oauth2.0 and Oauth1.0 (for Twitter) flows.

I used Redis for storing user session data since long-lived sessions were important. I also allowed a regular username/password login option with options to verify email and reset password. For this purpose, I used AWS SES to generate templates for sending custom emails to users. 