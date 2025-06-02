#!/bin/bash

# check for sourced env
if [[ -z ${DOJO_PATH} || -z ${DATA_PATH} ]]
then
    echo "Error: DOJO_PATH and DATA_PATH must be set! Did you source and update the env?"
    exit 1
fi

# check for additional file
if [! -f "${DOJO_PATH}/infra-docker-additional.env"]
then
    echo "INFO: infra-docker-additional.env not found. Creating from template"
    cp "${DOJO_PATH}/infra-docker-additional.env.template" "${DOJO_PATH}/infra-docker-additional.env"
fi
 

docker run --name dojo \
	--privileged \
	-v "${DOJO_PATH}:/opt/pwn.college" \
	-v "${DATA_PATH}:/data" \
    --env-file "${DOJO_PATH}/infra-docker-mandatory.env" \
    --env-file "${DOJO_PATH}/infra-docker-additional.env" \
	-p 22:22 -p 80:80 -p 443:443 \
	-d pwncollege/dojo

docker exec dojo dojo wait
