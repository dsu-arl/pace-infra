#!/bin/bash

# check for sourced env
if [[ -z ${DOJO_PATH} ]]
then
    echo "Error: DOJO_PATH must be set! Did you source and update the env?"
    exit 1
fi


docker build -t pwncollege/dojo "$DOJO_PATH"
