#!/bin/bash

if [[ $(docker ps | grep "$DOCKER_PROJECT" | awk '{print $1}') ]]; then docker ps | grep "$DOCKER_PROJECT" | awk '{print $1}' | xargs docker stop; fi
if [[ $(docker ps -a | grep "$DOCKER_PROJECT" | awk '{print $1}') ]]; then docker ps -a | grep "$DOCKER_PROJECT" | awk '{print $1}' | xargs docker rm; fi
if [[ $(docker images -a | grep "$DOCKER_PROJECT" | awk '{print $3}') ]]; then docker images -a | grep "$DOCKER_PROJECT" | awk '{print $3}' | xargs docker rmi; fi
docker run -it --rm --network="host" -p "$PORT:$PORT" -v /home/duddits/portfolio.app/upload:/app/upload -d "$DOCKER_USER/$DOCKER_PROJECT"
