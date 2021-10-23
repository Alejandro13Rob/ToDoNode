#!/bin/bash
set -e
remote_environments=("production")

echo "Building $NODE_ENV environment"

if [[ "$NODE_ENV" = "local" ]]; # If it's a local environment then don't build
then
    echo "No building because local environment"
elif [[ "${remote_environments[@]}" =~ "${NODE_ENV}" ]] # If it's a remote environment then run directly
then
    npm run build
fi