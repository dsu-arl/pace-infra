#!/bin/bash

docker exec -it dojo dojo compose down
docker exec -it dojo docker network prune --force
docker rm -f dojo
