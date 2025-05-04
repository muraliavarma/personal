---
title: TripIt Vue Web app
tags: ['VueJS', 'Docker', 'CloudFormation', 'Nginx', 'Auth', 'PHP', 'Jest', 'Cypress']
image: /assets/tripit.png
sortOrder: 3
---

I am currently leading a dev team in developing TripIt's new Web Application built from the ground up in VueJS. My initial goal was to create a POC that integrates with TripIt's existing infrastructure of AWS ECS containers and CI/CD pipeline. Next, I deep dived into authentication mechanisms and created RFCs for team input. We decided upon industry best practices and chose cookie based mechanism over OAuth2 to reduce attack vectors.

Some of my responsibilities included doing architectural reviews with the threat modeling team, mentoring junior developers and creating onboarding documents. Before getting into the daily feature work, I also setup a comprehensive serializer/deserializer framework to abstract out our legacy API in order to reduce work when we transition to the new API.

As we rolled this app out in EU first, I had some significant challenges to overcome before we could launch. In particular, our old web app was only avalable to US, while our mobile app worked in EU and US. A lot of our code was written under the assumption that only mobile would ever work in EU. I needed a way for browser cookies to maintain sessions for EU, which required a good amount of collaboration with other senior engineers.

Some of the more interesting features that I worked on in this project include COVID Guidance, account email management, localization and inbox synchronization. 