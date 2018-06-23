Personal websites built on containers of different technologies

TODO:
- Code for my personal website (https://murlax.com) and my dad's website (https://infinityinfratech.com)
- Docker containers for:
  - Hosting the node server for basic site navigation
  - Go server + embree for the path tracing engine https://github.com/fogleman/pt/tree/embree
  - PHP server for hosting my dad's website
- Kubernetes for orchestration of different containers, especially scaling up/down the path tracing containers
- Circle CI for automatically picking up changes
- Stretch goals:
  - Vagrant for development
  - Packer for building docker images
  - Terraform for managing the infrastructure
  
