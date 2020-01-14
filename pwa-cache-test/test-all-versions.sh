#!/usr/bin/env bash

CURRENT_PROD_VERSION=498
for (( i=439; i<=440; i++)); do
    export VERSION="1.${i}"
    echo "Running test on version ${VERSION}"
    echo ${VERSION}
    docker-compose -f ./pwa-cache-test/docker-compose.yaml up -d
    cd smoke-test/ || exit
    npm i && npm run pwatest && cd ..
    docker-compose -f ./pwa-cache-test/docker-compose.yaml rm -f
    echo "Successfully completed test for ${VERSION}"
done

