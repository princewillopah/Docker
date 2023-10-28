#!/bin/bash
# exit when any command fails
set -e

# Application containers should not store application data

# Check if container is running.
if docker inspect -f '{{.State.Running}}' $1; then
  docker stop $1
fi

docker pull docker.pkg.github.com/$2
docker run --rm -d -p $3:$3 --name $1 docker.pkg.github.com/$2