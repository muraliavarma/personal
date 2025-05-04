---
title: Geo Spatial Data Explorer
tags: ['VueJS', 'Python', 'Kubernetes', 'MongoDB', 'OpenSource', 'Jest', 'Tox']
image: /assets/atlas.jpg
sortOrder: 7
---

This product startup aimed to present complex geospatial data in easy-to-understand formats of Tables and Maps. I worked as Full Stack Engineer, all the way from the UI in VueJS to the deployment in Kubernetes including the backend in Flask/Python and managing user data in MongoDB. 

I took ownership of the data table component and made a completely in-house open sourced VueJS table component that uses the power of scoped slots. Some of its features are sticky columns, grouped headers and unopinionated styling that allow end-users to customize the look and feel while not sacrificing functionality.

I also handled the Python mini-server code, which would interact with a much larger data API using Keycloak as its authentication mechanism. Consequently, I worked on all the token exchange mechanisms between various clients, Keycloak JavaScript library integration and Keycloak login page theming (using kubernetes init containers managed via Helm and Apache Freemarker). 