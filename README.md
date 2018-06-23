Personal websites built on containers of different technologies

__TODO__:
- Static HTML/CSS/JS for my personal website (https://murlax.com) and my dad's AngularJS website (https://infinityinfratech.com)
- Docker containers for:
  - Node server + ExpressJS for basic site navigation
  - Go server + embree for the path tracing engine https://github.com/fogleman/pt/tree/embree
  - PHP server for hosting my dad's website
- Kubernetes for orchestration of different containers:
  - Scaling up/down the path tracing containers based on load
  - Communicating between different servers through REST / services
- Circle CI for automatically picking up changes
- Stretch goals:
  - Vagrant for development
  - Packer for building docker images
  - Terraform for managing the infrastructure
  
