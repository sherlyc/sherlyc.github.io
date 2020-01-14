#!/usr/bin/env bash

cd smoke-test/ && npm i && cd ..
export URL="http://localhost:8888/"
CURRENT_PROD_VERSION=498
for (( i=439; i<=CURRENT_PROD_VERSION; i++ )); do
    export VERSION="1.${i}"
    echo "Running test on version ${VERSION}"
    (docker-compose -f ./pwa-cache-test/docker-compose.yaml up) & (cd smoke-test/ && sleep 10 && npm run pwatest && cd ..)
    docker-compose -f ./pwa-cache-test/docker-compose.yaml down
    echo "Successfully completed test for ${VERSION}"
    echo $(( CURRENT_PROD_VERSION - i )) "versions left to run"
    printf "\n\n\n\n"
done

