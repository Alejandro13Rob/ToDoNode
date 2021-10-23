#!/bin/bash
set -e
remote_environments=("development uat production")

echo "Running $NODE_ENV environment"

if [[ "$NODE_ENV" = "local" ]]; # If it's a local environment then run dev
then
    nodemon src/index.ts
elif [[ "${remote_environments[@]}" =~ "${NODE_ENV}" ]] # If it's a remote environment then run directly
then
    node dist/index.js
fi